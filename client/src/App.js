import React from 'react';
import { Fragment } from 'react';
// import logo from './logo.svg';
// import './App.css';

import {Route, NavLink, withRouter} from 'react-router-dom';   // ADD HERE for route fun!
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Jokes from './views/Jokes';


//function App() {
class App extends React.Component {

  logout = () => {

    console.log(" Now Logged OUT");
    
    localStorage.removeItem('token')  // changed from jwt to token
    this.props.history.push('/login')
  }


  render() {
    return (
      <Fragment>
        <h2> Sprint Authentication with JWT & Jokes  !</h2>

        <ul>
          <li><NavLink to = "/signup">Signup</NavLink></li>
          <li><NavLink to = "/login">Login</NavLink></li>
          <li><NavLink to = "/jokes">Jokes</NavLink></li>
          <li><button onClick={this.logout}>Logout</button></li>
        
        </ul>


        <main>
          <Route path = "/signup" component = {SignUp}/>
          <Route path = "/login" component = {SignIn} />
          <Route path = "/jokes" component = {Jokes}/>
        </main>
      </Fragment>
    );
  }  
}

//export default App;
export default withRouter(App);
