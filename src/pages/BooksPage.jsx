import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';

export default function BooksPage() {
  const [booksArr, setBooksArr] = useState([]);
  console.log('booksArr ===', booksArr);
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
  useEffect(() => {
    getBooksFb();
  }, []);

  const newBook = {
    title: 'To Kill a Dublicate',
    year: 1960,
    author: 'Harper Lee',
    isOnSale: false,
  };

  async function createBook() {
    console.log('creating');
    try {
      const docRef = await addDoc(collection(db, 'books'), newBook);
      console.log('Document written with ID: ', docRef.id);
      getBooksFb();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  async function handleDelete(idToDelete) {
    console.log('idToDelete ===', idToDelete);
    // await deleteDoc(doc(db, "kolekcija", "dokumento id"));
    try {
      const rez = await deleteDoc(doc(db, 'books', idToDelete));
      // sekme
      console.log('pavyko istrinti', rez);
      getBooksFb();
    } catch (error) {
      // nesekme
      console.warn('handleDelete error ===', error);
    }
  }

  async function turnSaleOn(idOnSale) {
    console.log('idOnSale ===', idOnSale);

    const todoToUpdateRef = doc(db, 'books', idOnSale);

    // Set the "capital" field of the city 'DC'
    await updateDoc(todoToUpdateRef, {
      isOnSale: true,
    });
    getBooksFb();

    // iskviesti mygtuko paspaudimu
    // atnaujinti irasa padarnt jo isOnSale i true
    // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=1#update-data
  }

  return (
    <div className='container'>
      <h1>Books page</h1>
      <p>make your todos</p>
      <div>
        <button onClick={() => {}}>get books data</button>
        <button onClick={createBook}>Create book</button>
      </div>

      <ul>
        {booksArr.map((bookObj) => (
          <li key={bookObj.id}>
            <h3>
              title: {bookObj.title}
              {/* tik tiems kas yra on sale rodom sita */}
              {bookObj.isOnSale && <span className='tomato'> -- onSale</span>}
            </h3>
            <p>
              <i>author: {bookObj.author} </i>
            </p>
            <button onClick={() => handleDelete(bookObj.id)}>Delete</button>
            <button onClick={() => turnSaleOn(bookObj.id)}>turn sale on</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
