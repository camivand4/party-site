import React from 'react'

export const Password = (props) => {

    // const [loggedIn, setLoggedIn] = useState(false);
    // const [admin, setAdmin] = useState(false);

    let checkPassword2 = () => {
        let value = document.getElementById("password").value;
       props.checkPassword(value)
    };

  return (
    <form id="start">
        <input
        id="password"
        type="password"
        placeholder="password"
        className="rad center"
        ></input>
        <button onClick={checkPassword2} className="dark-b rad">
        check
        </button>
  </form>
  )
}
