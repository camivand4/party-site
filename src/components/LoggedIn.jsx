import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import InfoComponent from './InfoComponent';

let testarray = [1,2,3]

export const LoggedIn = (props) => {

  return (
    <>
    <div id="left">
      {/* info */}
      <div id="info" className="light-b pd4 rad">
        <h1>Info:</h1>
        <div className='infoComponents'>
          {props.info.map(newInfo => { return (<InfoComponent newInfo={newInfo}/>)})}
        </div>
      </div>

      {/* what to bring */}
      <div id="wtb" className="light-b rad pd4">
        <h2>Wat neem je mee?</h2>
        <ul>
          {props.wTB.map((wtb, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: wtb.a }}></li>
          ))}
        </ul>
      </div>
    </div>

    <div
      className="light-b pd4 rad cur-point"
      id="users"
      onClick={() => {
        props.usersBlock.current.classList.toggle('show');
        props.arrow.current.classList.toggle('rotate');
      }}
    >
      <div className="amountPerPerson">
        <h2>
          Bedrag per persoon:{' '}
          {'€' + Math.round(props.info[0].price / props.test)}
        </h2>
        <span className='arrow' ref={props.arrow}>▼</span>
      </div>
      <div className="usersBlock" ref={props.usersBlock}>
        <h2>Betaald:</h2>
        
        {props.users.map((user, index) => (
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
      </div>
    </div>
    </>
  )
}

