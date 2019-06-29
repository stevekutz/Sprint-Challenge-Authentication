import React from 'react';
import { Fragment } from 'react';
// import logo from './logo.svg';
import './App.css';

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
      <div className = "App">
      
            <h2> Sprint Authentication with JWT & Jokes  !</h2>
            <div className = "nav-container">
                  <div className = "nav">
                    <NavLink to = "/signup">Signup</NavLink>
                    <NavLink to = "/login">Signin</NavLink>
                    <NavLink to = "/jokes">Jokes</NavLink>
                  </div>
 
                  <button onClick={this.logout}>Logout</button>
            </div>

            <main>
              <Route path = "/signup" component = {SignUp}/>
              <Route path = "/login" component = {SignIn} />
              <Route path = "/jokes" component = {Jokes}/>
            </main>
            <div
            style={{
              backgroundImage: "url(https://images.pexels.com/photos/50582/selfie-monkey-self-portrait-macaca-nigra-50582.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
              backgroundPosition: 'center',
             // backgroundSize: 'cover',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              width: '90%',
              margin: "5px auto",
              position: "absolute",
              zIndex : "-1",
              top: "250px",
              bottom: 0,
              left: 0,
              right: 0,
      
            }}>
            </div>
      
      </div>
      


    );
  }  
}

//export default App;
export default withRouter(App);
