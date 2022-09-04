import React from 'react'

export default function InfoComponent(props) {

    let a = props.newInfo

  return (
    <div>
        <h2>{props.newInfo.title}:</h2>
        {
            Object.keys(a).map((key) => {
                if (key !== "title" && key !==  "id" && key !==  "price") {
                    return (<p key={key} dangerouslySetInnerHTML={{ __html: a[key] }}></p>)
                }
            })
        }
    </div>
  )
}