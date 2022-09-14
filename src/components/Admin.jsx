import React from 'react'
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

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

  return (
    <div>
      <h1>Users:</h1>

      <div className='margin-b-10'>
        <label htmlFor="name">Name: </label>
        <input type="text" id='name' onChange={(event) => { setNewName(event.target.value) }} />
        <button onClick={createUser}>Create</button>
      </div>

      <div className='usersAdmin grid margin-b-10'>
        {users.map((user, index) => (
          <>
          <div key={index+"name"+user.name} className="gridLine">
            <label htmlFor="name">{user.name}: </label>
            <input id={"name"+user.id} type="text" placeholder={user.name} defaultValue={user.name} />
          </div>
          <div key={index+"active"+user.name} className="gridLine">
            <label htmlFor="active">Active: </label>
            {user.active ? (
              <input id={"active"+user.id} type="checkbox" defaultChecked value="true" />
            ) : (
              <input id={"active"+user.id} type="checkbox" value="false"/>
            )}
          </div>
          <div key={index+"paid"+user.name} className="gridLine">
            <label htmlFor="paid">Paid: </label>
            {user.paid ? (
              <input id={"paid"+user.id} type="checkbox" defaultChecked value="true" />
            ) : (
              <input id={"paid"+user.id} type="checkbox" value="false"/>
            )}
          </div>
          <div key={index} className="gridLine">
            <button className='updateButton' onClick={() => {updateUser(user.id)}}>Update</button>
            <button className='deleteButton' onClick={() => {deleteUser(user.id)}}>Delete</button>
          </div>
          </>
        ))}
      </div>

      <h1>Info:</h1>



      <h1>What to bring:</h1>

      <div className='margin-b-10'>
        <label htmlFor="wTB">What to bring: </label>
        <input type="text" id='wTB' onChange={(event) => { setNewWTB(event.target.value) }} />
        <button onClick={createWTB}>Create</button>
      </div>

      <div className='wTBAdmin margin-b-10 flex column'>
        {wTB.map((wtb, index) => (
          <div className='flex'>
            <input key={wtb.a+index} id={wtb.id} type="text" defaultValue={wtb.a} className="margin-b-10 wTBAdminInput"/>
            <button className='updateButton' onClick={() => {updateWTB(wtb.id)}}>Update</button>
            <button className='deleteButton' onClick={() => {deleteWTB(wtb.id)}}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  )
}
