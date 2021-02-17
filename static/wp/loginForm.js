import React from 'react';
import ReactDOM from 'react-dom'; 

export function Login() {
  const submitLogin = (e) => {
    e.preventDefault();
    const payload={
        "email":state.email,
        "password":state.password,
    }
    axios.post(API_BASE_URL+'login', payload)
        .then(function (response) {
            if(response.data.code === 200){
                setState(prevState => ({
                    ...prevState,
                    'successMessage' : 'Login successful. Redirecting to home page..'
                }))
                redirectToHome();
                props.showError(null)
            }
            else if(response.data.code === 204){
                props.showError("Username and password do not match");
            }
            else{
                props.showError("Username does not exists");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  }

    return (
    <div><form action="/login" method="POST">
    <p>
      Email <input type="text" name="email" required/>
    </p>

    <p>
      Password <input type="password" name="password" required/>
    </p>

    <p>
      <input type="submit" onSubmit={submitLogin} />
    </p>
    </form></div>
  )
}

  ReactDOM.render(
      <Login />,
      document.getElementById('app')
  );