import React from 'react'
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import AdminCreate from './AdminCreate';
import AdminUsersList from './AdminUsersList';
import AdminWTBList from './AdminWTBList';

export const Admin = () => {

  const [newName, setNewName] = useState("");
  const [newWTB, setNewWTB] = useState("");

  const usersCollectionRef = collection(db, 'users');
  const infoCollectionRef = collection(db, 'info');
  const wTBCollectionRef = collection(db, 'whatToBring');

  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState([]);
  const [wTB, setWTB] = useState([]);

  // useEffect -> on page render
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getInfo = async () => {
      const data = await getDocs(infoCollectionRef);
      setInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getWTB = async () => {
      const data = await getDocs(wTBCollectionRef);
      setWTB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    getInfo();
    getWTB();
  }, []);
  
  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, active: false, paid: false})
  }

  const createWTB = async () => {
    await addDoc(wTBCollectionRef, {a: newWTB})
  }

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);

    let nameId = "name"+id;
    let newName = document.getElementById(nameId).value;

    let activeId = "active"+id
    let newActive = document.getElementById(activeId).checked;

    let paidId = "paid"+id
    let newPaid = document.getElementById(paidId).checked;

    const newFields = {name: newName, active: newActive, paid: newPaid};
    await updateDoc(userDoc, newFields);
  }

  const updateWTB = async (id) => {
    const wTBDoc = doc(db, "whatToBring", id);

    let newValue = document.getElementById(id).value;

    const newFields = {a: newValue};
    await updateDoc(wTBDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  const deleteWTB = async (id) => {
    const wTBDoc = doc(db, "whatToBring", id);
    await deleteDoc(wTBDoc);
  }

  let buttonDelete = true

  const changeDeleteButton = async () => {
    buttonDelete=!buttonDelete
    console.log(buttonDelete)
  }

  return (
    <div>
      <div>
        {buttonDelete ? (<p>hello</p>): (<p>niet hello</p>)}
        <button onClick={() => {changeDeleteButton()}}>Show delete</button>
      </div>

      <h1>Users:</h1>
      <AdminCreate title={"Name"} setNew={setNewName} createNew={createUser} />
      <AdminUsersList users={users} updateUser={updateUser} deleteUser={deleteUser} />

      <h1>Info:</h1>



      <h1>What to bring:</h1>
      <AdminCreate title={"What to bring"} setNew={setNewWTB} createNew={createWTB} />
      <AdminWTBList wTB={wTB} updateWTB={updateWTB} deleteWTB={deleteWTB} />

    </div>
  )
}
