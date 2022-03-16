import { useState, useEffect, useRef } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

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

  let checkPassword = (event) => {
    event.preventDefault();
    let password = document.getElementById('password');

    if (password.value === process.env.REACT_APP_PASSWORD) {
      setLoggedIn(true);
    }
  };

  let test = 0;

  users.map((user, index) => {
      if (user.active === true) {
        test += 1;
      }
    }
  )


  return (
    <div className="App">
      <header className="dark-b center rad">Cama's party</header>
      <main id="main">
        {loggedIn && info?.length && wTB?.length && users?.length ? (
          <>
            <div id="left">
              <div id="info" className="light-b pd4 rad">
                <h1>Info:</h1>
                <div>
                  <div>
                    <h2>Waar:</h2>
                    <p>{info[0].where}</p>
                    <a href={info[0].whereLink}>Link to google maps</a>
                    <div dangerouslySetInnerHTML={{ __html: info[0].whereExtra }}></div>
                  </div>
                  <div>
                    <h2>Wanneer:</h2>
                    <div dangerouslySetInnerHTML={{ __html: info[0].when }}></div>
                    <br></br>
                    <h2>Contact:</h2>
                    <div dangerouslySetInnerHTML={{ __html: info[0].contact }}></div>
                  </div>
                  <div>
                    <h2>Betaling:</h2>
                    <div dangerouslySetInnerHTML={{ __html: info[0].how }}></div>
                  </div>
                </div>
              </div>

              <div id="wtb" className="light-b rad pd4">
                <h2>Wat neem je mee?</h2>
                <ul>
                  {wTB.map((wtb, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: wtb.a }}></li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="light-b pd4 rad cur-point"
              id="users"
              onClick={() => {
                usersBlock.current.classList.toggle('show');
                arrow.current.classList.toggle('rotate');
              }}
            >
              <div className="amountPerPerson">
                <h2>
                  Bedrag per persoon:{' '}
                  {'€' + Math.round(info[0].price / test)}
                  {console.log(test)}
                </h2>
                <span className='arrow' ref={arrow}>▼</span>
              </div>
              <div className="usersBlock" ref={usersBlock}>
                <h2>Betaald:</h2>
                {users.map((user, index) => (
                  <div key={index}>
                  { user.active ?  (
                    <label htmlFor={user.name} className="user">
                    <span>{user.name}</span>
                    <input
                      type="checkbox"
                      name={user.name}
                      id={user.name}
                      readOnly
                      checked={user.paid}
                    />
                    </label>
                  ) : (
                    <label htmlFor={user.name} className="notActive">
                    <span>{user.name}</span>
                    <input
                      type="checkbox"
                      name={user.name}
                      id={user.name}
                      readOnly
                      checked={user.paid}
                    />
                    </label>
                    )
                  }
                  </div>
                ))}
                <p>mierenneuker Luca</p>
              </div>
            </div>
          </>
        ) : (
          <form id="start">
            <input
              id="password"
              type="password"
              placeholder="password"
              className="rad center"
            ></input>
            <button onClick={checkPassword} className="dark-b rad">
              check
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

export default App;
