import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';

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

  return (
    <div className='container'>
      <h1>TodoPage</h1>
      <p>Welcome to TodoPage page</p>
      {/* <button onClick={initTodo}>initTodo</button> */}
      {/* <button onClick={getTodosFromFireStore}>get Todos</button> */}

      <ul className='unlisted'>
        {/* atspausdinti visus todo */}
        {localTodoArr.map((tObj) => (
          <li key={tObj.id}>
            {' '}
            <BsCircle size={20} />
            <BsCheckCircle size={20} />
            <span>{tObj.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
