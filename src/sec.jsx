const [loggedIn, setLoggedIn] = useState(false);
const [admin, setAdmin] = useState(false);

let checkPassword = (event) => {
  alert('testing')
  event.preventDefault();
  let password = document.getElementById('password');

  if (password.value === "camille") {
    setLoggedIn(true);
  } else if (password.value === "admin") {
    setLoggedIn(true);
    setAdmin(true);
  }
  console.log(password);
};
      

      {/* {loggedIn ? 
        (
          <>
          {
            admin ? (<Admin />): (<LoggedIn />)
          }
          </>
        ) : (
          <Password checkPassword={this.checkPassword}/>
        )} */}