import React from 'react'
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export const Admin = () => {

  const [newName, setNewName] = useState("");

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

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    let newId = "name"+id;
    let newName = document.getElementById(newId).value;
    const newFields = {name: newName};
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }
  
  return (
    <div>
      <div className='margin-b-10'>
        <label htmlFor="name">Name: </label>
        <input type="text" id='name' onChange={(event) => { setNewName(event.target.value) }} />
        <button onClick={createUser}>Create</button>
      </div>


        <div className='usersAdmin grid'>
          {users.map((user, index) => (
            <>
            <div key={index+"name"+user.name} className="gridLine">
              <label htmlFor="name">{user.name}: </label>
              <input id={"name"+user.id} type="text" placeholder={user.name} defaultValue={user.name} />
            </div>
            <div key={index+"active"+user.name} className="gridLine">
              <label htmlFor="active">Active: </label>
              <input id='active' type="checkbox" checked={user.active ? ('checked="checked"') : ("")} />
            </div>
            <div key={index+"paid"+user.name} className="gridLine">
              <label htmlFor="paid">Paid: </label>
              <input id='paid' type="checkbox" checked={user.paid ? ('checked="checked"') : ("")} />
            </div>
            <div key={index} className="gridLine">
              <button className='updateButton' onClick={() => {updateUser(user.id)}}>Update</button>
              <button className='deleteButton' onClick={() => {deleteUser(user.id)}}>Delete</button>
            </div>
            </>
          ))}
        </div>
    </div>
  )
}
