import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function App() {

  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState([]);
  const [wTB, setWTB] = useState([]);

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

  let main = document.getElementById('main');
  // let div_left
  // let div_right
  // let info1
  // let wtb1
  // let info_h1
  // let info_where_div
  // let info_when_div
  // let info_payment_div
  // let where_firestore
  // let where_firestore_link
  // let where_firestore_extra
  // let info_h2_when
  // let when_firestore
  // let info_h2_payment
  // let payments_firestore
  // let wtb_h2
  // let wtb_ul
  // let wtb_li
  // let pp
  // let pp_info_firestore
  // let paid
  // let user_div_paid
  // let user_name_paid
  // let user_input_paid
  // let user_div_not_paid
  // let user_name_not_paid
  // let user_input_not_paid



  let create = (nameCreate, what, id, classy, append, text, hrefText, attribute) => {

    // create element with what
    this.nameCreate = document.createElement(what)

    // if id != null set an id
    if (id !== null) {
      this.nameCreate.setAttribute('id', id)
    }

    // if class != null set classes
    if (classy !== null) {
      classy.forEach(element => {
        this.nameCreate.classList.add(element)
      });
    }

    // append named var to appended var
    append.appendChild(this.nameCreate);

    // if text != null set text
    if (text !== null) {
      this.nameCreate.innerHTML = text
    }

    // if href != null set link
    if (hrefText !== null) {
      this.nameCreate.href =hrefText
    }

  }

  // create(nameCreate, what, id, classy, append, text, hrefText, attribute);
  // create('p', 'p_id', 'p_class', 'div', 'dit is mijn text', 'google.com', 'geen checkbox');

  let makePage = () => {
    // div_left
    create('div_left', 'div', 'left', null, main, null, null, null);

    // div_right
    create('div_right', 'div', 'users', ['light-b', 'pd4', 'rad'], main, null, null, null);

    // info1
    create('info1', 'div', 'info', ['light-b', 'pd4', 'rad'], div_left, null, null, null);

    // wtb
    create('wtb1', 'div', 'wtb', ['light-b', 'pd4', 'rad'], div_left, null, null, null);

    // info_h1
    create('info_h1', 'h1', null, null, info1, 'Info:', null, null);

    // info_where_div
    create('info_where_div', 'div', null, null, info1, null, null, null);

    // info_when_div
    create('info_when_div', 'div', null, null, info1, null, null, null);

    // info_payment_div
    create('info_payment_div', 'div', null, null, info1, null, null, null);

    // info_h2_where
    create('info_h2_where', 'h2', 'wtb', ['light-b', 'pd4', 'rad'], info_where_div, 'Waar:', null, null);

    info.map((info) => {
      // where_firestore
      create('where_firestore', 'p', null, null, info_where_div, info.where, null, null);

      // where_firestore_link
      create('where_firestore_link', 'a', null, null, info_where_div, 'Link to google maps', info.whereLink, null);

      // where_firestore_extra
      create('where_firestore_extra', 'p', null, null, info_where_div, 'Link to google maps', null, null);
    })

    // info_h2_when
    create('info_h2_when', 'h2', null, null, info_when_div, 'Wanneer:', null, null);

    info.map((info) => {
      // when_firestore
      create('when_firestore', 'p', null, null, info_when_div, info.when, null, null);
    })

    // info_h2_payment
    create('info_h2_payment', 'h2', null, null, info_payment_div, 'Betalingen:', null, null);

    info.map((info) => {
      // payments_firestore
      create('payments_firestore', 'p', null, null, info_payment_div, info.how, null, null);
    })

    // wtb_h2
    create('wtb_h2', 'h2', null, null, wtb1, 'Wat neem je mee?', null, null);
    
    // wtb_ul
    create('wtb_ul', 'ul', null, null, wtb1, null, null, null);

    wTB.map((wtb) => {
      // wtb_firestore
      create('wtb_li', 'li', null, null, wtb_ul, wtb.a, null, null);
    })

    // pp
    create('pp', 'h2', null, null, div_right, 'Amount per person:', null, null);

    info.map((info) => {
      // pp_info_firestore
      create('pp_info_firestore', 'h2', null, null, div_right, '€' + Math.round(info.price / info.deelnemers), null, null);
    })

    // paid
    create('paid', 'h2', null, null, div_right, 'Paid:', null, null);

    users.map((user) => {
      if (user.paid === true) {
        // user_div_paid
        create('user_div_paid', 'div', null, ['user'], div_right, null, null, null);

        // user_name_paid
        create('user_name_paid', 'p', null, null, user_div_paid, user.name, null, null);

        // user_input_paid
        create('user_input_paid', 'input', null, ['checkbox'], user_div_paid, user.name, null, {"type": "checkbox","readOnly": "readOnly","checked": "checked"});

      } else {
        // user_div_not_paid
        create('user_div_not_paid', 'div', null, ['user'], div_right, null, null, null);

        // user_name_not_paid
        create('user_name_not_paid', 'p', null, ['user'], user_div_not_paid, user.name, null, null);
       
        // user_input_not_paid
        create('user_input_not_paid', 'input', null, ['checkbox'], user_div_not_paid, user.name, null, {"type": "checkbox","readOnly": "readOnly"});
      }
    })

    ///////////////////////////////////////////////
    // Todo: test
    console.log('made page')
  }


  let checkPassword = () => {
    let password = document.getElementById('password');

    if (password.value === process.env.REACT_APP_PASSWORD) {
      console.log('test')
      main.innerHTML = "";
      makePage()
    }
  }

  return (
    <div className="App">
      <header className="dark-b center rad">
        Cama's party
      </header>
      <main id='main'>
        <div id='start'>
          <input id='password' type='password' placeholder='password' className='rad center'></input>
          <button onClick={checkPassword} className='dark-b rad'>check</button>
        </div>
      </main>
    </div>
  );
}

export default App;
