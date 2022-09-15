import React from 'react'

export default function AdminInfoList(props) {
  return (

    <div>
        {props.info.map((info, index) => (
            <div key={index}>
                {info.price && 
                    <>
                        <div key={index+"price"+info.price} className="gridLine">
                            <label htmlFor="price">Price: </label>
                            <input id={"price"+info.id} type="text" defaultValue={info.price} />
                        </div>

                        <div className="gridLine">
                            <button className='updateButton' onClick={() => {props.updateInfo(info.id, "price")}}>Update</button>
                        </div>
                    </>
                }
                <br></br>
                {info.id === "when" &&
                    <div>
                        <div key={index+"when"+Object.values(info)[0]} className="gridLine">
                            <input id={"when"+info.id} type="text" className="width100" defaultValue={Object.values(info)[0]} />
                            <p dangerouslySetInnerHTML={{ __html: Object.values(info)[0] }}></p>
                        </div>

                        <div className="gridLine">
                            <button className='updateButton' onClick={() => {props.updateInfo(info.id, "when")}}>Update</button>
                        </div>
                    </div>
                }
            </div>


        ))}
    </div>
  )
}
