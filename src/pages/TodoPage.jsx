import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { GrAddCircle } from 'react-icons/gr';
import './Todo.css';

const initTodos = [
  { title: 'Buy Eggs', done: false, date: '' },
  { title: 'Go to Shopping', done: true, date: '' },
  { title: 'Do a 100 pushups', done: false, date: '' },
];

export default function TodoPage() {
  const [localTodoArr, setLocalTodoArr] = useState([]);
  console.log('localTodoArr ===', localTodoArr);
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
      console.log('querySnapshot ===', querySnapshot);
      // sekme
      console.log('success');
      const todosBack = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} =>`, doc.data());
        todosBack.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log('todosBack ===', todosBack);
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

  // 3 panaudosim addDoc fn irasyti i db

  // 4 parisiussti duomenis is db

  return (
    <div className='container'>
      <h1>TodoPage</h1>
      <p>Welcome to TodoPage page</p>
      <button onClick={initTodo}>initTodo</button>

      <fieldset className='flex gap-10'>
        <legend>Add todo</legend>
        <input type='text' placeholder='Add new Todo' />
        <button>
          <GrAddCircle size={25} />
        </button>
      </fieldset>

      {/* <button onClick={getTodosFromFireStore}>get Todos</button> */}

      <ul className='unlisted'>
        {/* atspausdinti visus todo */}
        {localTodoArr.map((tObj) => (
          <li className='todoItem  gap-10 mb-10' key={tObj.id}>
            {tObj.done ? <BsCheckCircle size={20} /> : <BsCircle size={20} />}
            <span>{tObj.title}</span>
            <button
              onClick={() => deleteSingleTodo(tObj.id)}
              className='deleteBnt'
            >
              <MdDeleteForever size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
