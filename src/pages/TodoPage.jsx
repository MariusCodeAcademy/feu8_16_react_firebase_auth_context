import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { GrAddCircle } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import './Todo.css';

const initTodos = [
  { title: 'Buy Eggs', done: false, date: '' },
  { title: 'Go to Shopping', done: true, date: '' },
  { title: 'Do a 100 pushups', done: false, date: '' },
];

export default function TodoPage() {
  const [newInputTitle, setNewInputTitle] = useState('');
  const [editIntpuTitle, setEditIntpuTitle] = useState('');
  const [localTodoArr, setLocalTodoArr] = useState([]);
  const [isEditOn, setIsEditOn] = useState(false);
  // console.log('localTodoArr ===', localTodoArr);
  // console.log('localTodoArr ===', JSON.stringify(localTodoArr, null, 2));
  async function editTodo(idToEdit) {
    // ar edit yra ijungtas?
    if (isEditOn === true) {
      // jei ijungtas mes siunciam atnaujinima i firebase
      try {
        const refToUpdateEl = doc(db, 'todos', idToEdit);
        await updateDoc(refToUpdateEl, {
          title: editIntpuTitle,
        });
        getTodosFromFireStore();
        setIsEditOn(false);
      } catch (error) {
        console.warn('error update title', error);
      }
    }

    // edit ijungimas
    const localTodoArrSuEditOn = localTodoArr.map((tObj) => {
      if (tObj.id === idToEdit) {
        // radom objekta kuri reikia pakeisti
        return { ...tObj, isEditOn: true };
      }
      return tObj;
    });
    setLocalTodoArr(localTodoArrSuEditOn);
    setEditIntpuTitle(
      localTodoArrSuEditOn.find((tObj) => tObj.id === idToEdit).title
    );
    setIsEditOn(true);
  }

  function editTitle(event) {
    setEditIntpuTitle(event.target.value);
  }

  async function initTodo() {
    console.log('initTodo');

    try {
      const docRef = await addDoc(collection(db, 'todos'), initTodos[2]);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async function getTodosFromFireStore() {
    // parsiusti ir iskonsolinti todos masyva su id

    try {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      // console.log('querySnapshot ===', querySnapshot);
      // sekme
      // console.log('success');
      const todosBack = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} =>`, doc.data());
        todosBack.push({
          id: doc.id,
          ...doc.data(),
          isEditOn: false,
        });
      });
      // console.log('todosBack ===', todosBack);
      setLocalTodoArr(todosBack);
    } catch (error) {
      console.warn('error geting todos', error);
    }
  }

  useEffect(() => {
    getTodosFromFireStore();
  }, []);

  async function deleteSingleTodo(idToDelete) {
    console.log('idToDelete ===', idToDelete);
    // delete form firebase
    try {
      await deleteDoc(doc(db, 'todos', idToDelete));
      // getTodosFromFireStore();
      // localiai pasalinti elementa is state
      const filtered = localTodoArr.filter((tObj) => tObj.id !== idToDelete);
      setLocalTodoArr(filtered);
    } catch (error) {
      console.warn('deleteSingleTodo', error);
    }
  }

  // 1 susieti inputa su state

  // 2 funkcija kuri bus vykdoma kai bus paspaustas mygtukaS
  async function handleNewTodo() {
    console.log('handleNewTodo');
    if (!newInputTitle.trim()) return;

    const newTodoObj = {
      title: newInputTitle,
      done: false,
      date: +new Date(),
    };
    console.log('newTodoObj ===', newTodoObj);
    try {
      // 3 panaudosim addDoc fn irasyti i db
      await addDoc(collection(db, 'todos'), newTodoObj);
      // 4 parisiussti duomenis is db
      getTodosFromFireStore();
      setNewInputTitle('');
    } catch (error) {
      console.warn('handleNewTodo', error);
    }
  }

  function handleEnterKey(event) {
    // console.log('handleEnterKey ivyko', event);
    if (event.key === 'Enter') {
      console.log('enter buvo paspausta');
      handleNewTodo();
    }
  }

  async function handleToggleDone(idToEdit) {
    console.log('idToEdit ===', idToEdit);

    try {
      const todoKuriEditinamRef = doc(db, 'todos', idToEdit);
      const todoObjAntKurioPaspausta = localTodoArr.find(
        (todoObj) => todoObj.id === idToEdit
      );
      console.log('todoObjAntKurioPaspausta ===', todoObjAntKurioPaspausta);
      const doneReiksme = todoObjAntKurioPaspausta.done;
      // Set the "capital" field of the city 'DC'
      await updateDoc(todoKuriEditinamRef, {
        done: !doneReiksme, // gauti elemento kuris turi id idToEdit done reiksme
      });
      getTodosFromFireStore();
    } catch (error) {
      console.warn('handleToggleDone', error);
    }
  }

  return (
    <div className='container'>
      <h1>TodoPage</h1>
      <p>Welcome to TodoPage page</p>
      <button onClick={initTodo}>initTodo</button>
      <p>title: {newInputTitle}</p>
      <p>editIntpuTitle: {editIntpuTitle}</p>
      <fieldset className='flex gap-10'>
        <legend>Add todo</legend>
        <input
          onChange={(event) => setNewInputTitle(event.target.value)}
          onKeyUp={handleEnterKey}
          value={newInputTitle}
          type='text'
          placeholder='Add new Todo'
        />
        <button onClick={handleNewTodo}>
          <GrAddCircle size={25} />
        </button>
      </fieldset>

      {/* <button onClick={getTodosFromFireStore}>get Todos</button> */}

      <ul className='unlisted'>
        {/* atspausdinti visus todo */}
        {localTodoArr.map((tObj) => (
          <li className='todoItem  gap-10 mb-10' key={tObj.id}>
            {tObj.done ? <BsCheckCircle size={20} /> : <BsCircle size={20} />}
            {/* title el */}
            {tObj.isEditOn === false && (
              <span
                onClick={() => handleToggleDone(tObj.id)}
                className={tObj.done ? 'doneItem' : ''}
              >
                {tObj.title}
              </span>
            )}
            {tObj.isEditOn && (
              <input
                type='text'
                onChange={editTitle}
                value={editIntpuTitle}
                placeholder='edit'
              />
            )}
            {/* <input type='text'  /> */}
            <button
              onClick={() => deleteSingleTodo(tObj.id)}
              className='deleteBnt'
            >
              <MdDeleteForever size={20} />
            </button>
            <button onClick={() => editTodo(tObj.id)}>
              <FiEdit />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
