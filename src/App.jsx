import { useState, useEffect, useRef } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { Header } from './components/Header';
import { Admin } from './components/Admin';
import { LoggedIn } from './components/LoggedIn';
import { Password } from './components/Password';

function App() {

const [loggedIn, setLoggedIn] = useState(false);
const [admin, setAdmin] = useState(false);

// Password
let checkPassword = (password) => {
  if (password === process.env.REACT_APP_PASSWORD) {
    setLoggedIn(true);
    // TODO: delete setAdmin
    // setAdmin(true);
  } else if (password === process.env.REACT_APP_ADMIN) {
    setLoggedIn(true);
    setAdmin(true);
  }
};

const [users, setUsers] = useState([]);
const [info, setInfo] = useState([]);
const [wTB, setWTB] = useState([]);

const usersBlock = useRef(null);
const arrow = useRef(null);

const usersCollectionRef = collection(db, 'users');
const infoCollectionRef = collection(db, 'info');
const wTBCollectionRef = collection(db, 'whatToBring');

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

let test = 0;

users.map((user, index) => {
    if (user.active === true) {
      test += 1;
    }
  }
)

return (
    <div className='App'>
      <Header />
      <main id='main'>
        {loggedIn ? 
          (
            <>
            {
              admin ? (<Admin />): (<LoggedIn info={info} wTB={wTB} usersBlock={usersBlock} arrow={arrow} users={users} test={test} />)
            }
            </>
          ) : (
          <Password checkPassword={checkPassword}/>
        )}
      </main>
    </div>
  );
}

export default App;
