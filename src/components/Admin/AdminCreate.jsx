import React from 'react'

export default function AdminCreate(props) {
  return (
    <div className='margin-b-10'>
        <label htmlFor="name">{props.title}: </label>
        <input type="text" id='name' onChange={(event) => { props.setNew(event.target.value) }} />
        <button onClick={props.createNew}>Create</button>
    </div>
  )
}
