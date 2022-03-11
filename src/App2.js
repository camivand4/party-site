import { useState, useEffect } from 'react';
import './App.css';
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

  let makePage = () => {
    // div_left
    let div_left = document.createElement('div')
    div_left.setAttribute('id', 'left')
    main.appendChild(div_left);

    // div_right
    let div_right = document.createElement('div')
    div_right.classList.add('light-b')
    div_right.classList.add('pd4')
    div_right.classList.add('rad')
    div_right.setAttribute('id', 'users')
    main.appendChild(div_right);

    // info1
    let info1 = document.createElement('div')
    info1.classList.add('light-b')
    info1.classList.add('pd4')
    info1.classList.add('rad')
    info1.setAttribute('id', 'info')
    div_left.appendChild(info1);

    // wtb
    let wtb1 = document.createElement('div')
    wtb1.classList.add('light-b')
    wtb1.classList.add('pd4')
    wtb1.classList.add('rad')
    wtb1.setAttribute('id', 'wtb')
    div_left.appendChild(wtb1);

    // info_h1
    let info_h1 = document.createElement('h1')
    info_h1.innerHTML = 'Info:'
    info1.appendChild(info_h1);

    // info_where_div
    let info_where_div = document.createElement('div')
    info1.appendChild(info_where_div);

    // info_when_div
    let info_when_div = document.createElement('div')
    info1.appendChild(info_when_div);

    // info_payment_div
    let info_payment_div = document.createElement('div')
    info1.appendChild(info_payment_div);

    // info_h2_where
    let info_h2_where = document.createElement('h2')
    info_h2_where.innerHTML = 'Waar:'
    info_where_div.appendChild(info_h2_where);

    info.map((info) => {
      // where_firestore
      let where_firestore = document.createElement('p')
      where_firestore.innerHTML = info.where
      info_where_div.appendChild(where_firestore);

      // where_firestore_link
      let where_firestore_link = document.createElement('a')
      where_firestore_link.href = info.whereLink
      where_firestore_link.innerHTML = 'Link to google maps'
      info_where_div.appendChild(where_firestore_link);

      // where_firestore_extra
      let where_firestore_extra = document.createElement('p')
      where_firestore_extra.innerHTML = info.whereExtra
      info_where_div.appendChild(where_firestore_extra);
    })

    // info_h2_when
    let info_h2_when = document.createElement('h2')
    info_h2_when.innerHTML = 'Wanneer:'
    info_when_div.appendChild(info_h2_when);

    info.map((info) => {
      // when_firestore
      let when_firestore = document.createElement('p')
      when_firestore.innerHTML = info.when
      info_when_div.appendChild(when_firestore);
    })

    // info_h2_payment
    let info_h2_payment = document.createElement('h2')
    info_h2_payment.innerHTML = 'Betalingen:'
    info_payment_div.appendChild(info_h2_payment);

    info.map((info) => {
      // payments_firestore
      let payments_firestore = document.createElement('p')
      payments_firestore.innerHTML = info.how
      info_payment_div.appendChild(payments_firestore);
    })

    // wtb_h2
    let wtb_h2 = document.createElement('h2')
    wtb_h2.innerHTML = 'Wat neem je mee?'
    wtb1.appendChild(wtb_h2);
    
    // wtb_ul
    let wtb_ul = document.createElement('ul')
    wtb1.appendChild(wtb_ul);

    wTB.map((wtb) => {
      // wtb_firestore
      let wtb_li = document.createElement('li')
      wtb_li.innerHTML = wtb.a
      wtb1.appendChild(wtb_li);
    })

    // pp
    let pp = document.createElement('h2')
    pp.innerHTML = 'Amount per person:'
    div_right.appendChild(pp);

    info.map((info) => {
      // pp_info_firestore
      let pp_info_firestore = document.createElement('h2')
      pp_info_firestore.innerHTML = '€' + info.price / info.deelnemers
      div_right.appendChild(pp_info_firestore);
    })

    // paid
    let paid = document.createElement('h2')
    paid.innerHTML = 'Paid:'
    div_right.appendChild(paid);

    users.map((user) => {
      if (user.paid == true) {
        // user_div_paid
        let user_div_paid = document.createElement('div')
        user_div_paid.classList.add('user')
        div_right.appendChild(user_div_paid);

        // user_name_paid
        let user_name_paid = document.createElement('p')
        user_name_paid.innerHTML = user.name
        user_div_paid.appendChild(user_name_paid);

        // user_input_paid
        let user_input_paid = document.createElement('input')
        user_input_paid.innerHTML = user.name
        user_input_paid.classList.add('checkBox')
        user_input_paid.setAttribute("type", "checkbox")
        user_input_paid.setAttribute("readOnly", "readOnly")
        user_input_paid.setAttribute("checked", "checked")
        user_div_paid.appendChild(user_input_paid);

      } else {
        // user_div_not_paid
        let user_div_not_paid = document.createElement('div')
        user_div_not_paid.classList.add('user')
        div_right.appendChild(user_div_not_paid);

        // user_name_not_paid
        let user_name_not_paid = document.createElement('p')
        user_name_not_paid.innerHTML = user.name
        user_div_not_paid.appendChild(user_name_not_paid);

        // user_input_not_paid
        let user_input_not_paid = document.createElement('input')
        user_input_not_paid.innerHTML = user.name
        user_input_not_paid.classList.add('checkBox')
        user_input_not_paid.setAttribute("type", "checkbox")
        user_input_not_paid.setAttribute("readOnly", "readOnly")
        user_div_not_paid.appendChild(user_input_not_paid);
      }
    })

    ///////////////////////////////////////////////
    // Todo: test
    console.log('made page')
  }


  let checkPassword = () => {
    let password = document.getElementById('password');

    if (password.value == 'pijpketel') {
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
