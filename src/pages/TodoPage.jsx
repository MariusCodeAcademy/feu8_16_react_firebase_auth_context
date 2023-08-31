import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useState } from 'react';

export default function TodoPage() {
  const [booksArr, setBooksArr] = useState([]);

  async function getBooksFb() {
    console.log('lets get some books');

    const querySnapshot = await getDocs(collection(db, 'books'));
    console.log('querySnapshot ===', querySnapshot);
    const dataBack = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => `);
      // console.log('doc.data()', doc.data());
      const singleBookObj = {
        id: doc.id,
        ...doc.data(),
      };
      // singleBookObj.id = doc.id;
      // console.log('singleBookObj ===', singleBookObj);
      dataBack.push(singleBookObj);
    });
    console.log('dataBack ===', dataBack);
    setBooksArr(dataBack);
  }

  return (
    <div className='container'>
      <h1>Todo page</h1>
      <p>make your todos</p>
      <div>
        <button onClick={getBooksFb}>get books data</button>
      </div>

      <ul>
        {booksArr.map((bookObj) => (
          <li key={bookObj.id}>
            title: {bookObj.title}, author: {bookObj.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
