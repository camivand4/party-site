import React from 'react'

export default function AdminUsersList(props) {
  return (
    <div>
        {props.users.map((user, index) => (
            <div key={index} className='usersAdmin grid margin-b-10'>
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
                <div className="gridLine">
                    <button className='updateButton' onClick={() => {props.updateUser(user.id)}}>Update</button>
                    <button className='deleteButton' onClick={() => {props.deleteUser(user.id)}}>Delete</button>
                </div>
            </div>
        ))}
    </div>
  )
}
