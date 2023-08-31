import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';

export default function TodoPage() {
  const [booksArr, setBooksArr] = useState([]);

  useEffect(() => {
    async function getBooksFb() {
      // console.log('lets get some books');

      const querySnapshot = await getDocs(collection(db, 'books'));
      // console.log('querySnapshot ===', querySnapshot);
      const dataBack = [];
      querySnapshot.forEach((doc) => {
        const singleBookObj = {
          id: doc.id,
          ...doc.data(),
        };
        // singleBookObj.id = doc.id;
        // console.log('singleBookObj ===', singleBookObj);
        dataBack.push(singleBookObj);
      });
      // console.log('dataBack ===', dataBack);
      setBooksArr(dataBack);
    }

    getBooksFb();
  }, []);

  const newBook = {
    title: 'To Kill a Mockingbird',
    year: 1960,
    author: 'Harper Lee',
    isOnSale: false,
  };

  async function createBook() {
    console.log('creating');
    try {
      const docRef = await addDoc(collection(db, 'books'), newBook);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // await deleteDoc(doc(db, "kolekcija", "dokumento id"));
  // atspausdinti console, ar pavyko ar ne
  return (
    <div className='container'>
      <h1>Todo page</h1>
      <p>make your todos</p>
      <div>
        <button onClick={() => {}}>get books data</button>
        <button onClick={createBook}>Create book</button>
      </div>

      <ul>
        {booksArr.map((bookObj) => (
          <li key={bookObj.id}>
            title: {bookObj.title}, author: {bookObj.author}
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
