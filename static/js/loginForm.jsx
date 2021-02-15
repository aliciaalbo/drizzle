
function Login() {
    return  ( <div><form action="/login" method="POST">
    <p>
      Email <input type="text" name="email" required/>
    </p>

    <p>
      Password <input type="password" name="password" required/>
    </p>

    <p>
      <input type="submit" />
    </p>
  </form>
  </div>);
  }
  

  ReactDOM.render(
      <Login />,
      document.getElementById('app')
  );