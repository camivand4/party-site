import React from 'react'

export default function AdminWTBList(props) {
  return (
    <div className='wTBAdmin margin-b-10 flex column'>
        {
            props.wTB.map((wtb, index) => (
            <div className='flex column wTBAdminBlock'>
                <div className='flex wTBAdminChangeable'>
                <input key={wtb.a+index} id={wtb.id} type="text" defaultValue={wtb.a} className="margin-b-10 wTBAdminInput"/>
                <button className='updateButton' onClick={() => {props.updateWTB(wtb.id)}}>Update</button>
                <button className='deleteButton' onClick={() => {props.deleteWTB(wtb.id)}}>Delete</button>
                </div>
                <p dangerouslySetInnerHTML={{ __html: wtb.a }}></p>
            </div>
            ))
        }
    </div>
  )
}
