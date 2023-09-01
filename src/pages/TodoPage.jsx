import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const initTodos = [
  { title: 'Buy Eggs', done: false, date: '' },
  { title: 'Go to Shopping', done: true, date: '' },
  { title: 'Do a 100 pushups', done: false, date: '' },
];

export default function TodoPage() {
  async function initTodo() {
    console.log('initTodo');

    try {
      const docRef = await addDoc(collection(db, 'todos'), initTodos[2]);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  function getTodosFromFireStore() {
    // parsiusti ir iskonsolinti todos masyva su id
  }

  return (
    <div className='container'>
      <h1>TodoPage</h1>
      <p>Welcome to TodoPage page</p>
      {/* <button onClick={initTodo}>initTodo</button> */}
      <button onClick={getTodosFromFireStore}>get Todos</button>
    </div>
  );
}
