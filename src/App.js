import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function App() {

  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState([]);
  const [wTB, setWTB] = useState([]);

  // const [info, setInfo] = useState([]);
  // const [wTB, setWTB] = useState([]);
  const usersCollectionRef = collection(db, 'users')
  const infoCollectionRef = collection(db, 'info')
  const wTBCollectionRef = collection(db, 'whatToBring')

  // useEffect -> on page render
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const getInfo = async () => {
      const data = await getDocs(infoCollectionRef);
      setInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const getWTB = async () => {
      const data = await getDocs(wTBCollectionRef);
      setWTB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getUsers()
    getInfo()
    getWTB()
  }, [])
  
  let wtf = []
  let yeet = wTB[0]
  for (let index in yeet) {
    if (yeet[index] != 'VZgtF2gNCA1Xr5mpFQTj') {
      wtf.push(yeet[index])
    }
  }

  return (
    <div className="App">
      <header className="dark-b center rad">Cama's party</header>
              <main>
                  <div id="left">
                      <div id="info" className="light-b pd4 rad">
                          <h1>Info:</h1>
                          <div>
                              <h2>Waar:</h2>
                              {
                                info.map((info) => {
                                    return <p key={info.where}>{info.where}</p>
                                })
                              }
                              {
                                info.map((info) => {
                                    return <a href={info.whereLink} key={info.whereLink}>Link to google maps</a>
                                })
                              }
                              {
                                info.map((info) => {
                                  return <p key={info.whereExtra}>{info.whereExtra}</p>
                              })
                              }
                          </div>
                          <div>
                              <h2>Wanneer:</h2>
                              {
                                info.map((info) => {
                                    return <p key={info.when}>{info.when}</p>
                                })
                              }
                              {/* <p>18-19 maart met overnachting</p> */}
                          </div>
                          <div>
                              <h2>Betaling:</h2>
                              {
                                info.map((info) => {
                                    return <p key={info.how}>{info.how}</p>
                                })
                              }
                              {/* <p>Feesten is spijtig genoeg niet gratis. Ik organiseer dit graag maar kan dit niet uit mijn eigen portemonnee betalen. De prijs wordt gewoon gedeeld onder de deelnemers.</p> */}
                          </div>
                      </div>

                      <div id="wtb" className="light-b rad pd4">
                          <h2>Wat neem je mee?</h2>
                          <ul>
                              {
                                wtf.map((wtf) => {
                                  return <li key={wtf}>{wtf}</li>
                                })
                              }
                          </ul>
                      </div>
                  </div>
                  <div className="light-b pd4 rad" id="users">
                    {
                      info.map((info) => {
                        return <h2 key={info.id}>Amount per person: <br></br> € Math.round({info.price / info.deelnemers})</h2>
                      }) 
                    }
                      <h2>Paid:</h2>
                      { users.map((user) => {
                          if (user.paid == true) {
                            return <div key={user.name} className='user'>
                              <p>{ user.name }</p>
                              <input type="checkbox" className="checkBox" checked readOnly></input>
                            </div> 
                          } else {
                            return <div key={user.name} className='user'>
                              <p>{ user.name }</p>
                              <input type="checkbox" className="checkBox" readOnly></input>
                            </div> 
                          }
                        }) 
                      }
                  </div>
              </main>
    </div>
  );
}

export default App;
