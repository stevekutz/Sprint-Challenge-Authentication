import React from 'react';
import { Fragment } from 'react';
// import axios from 'axios';    // from TK
import api from '../helpers/api';

class SignIn extends React.Component {
    state = {
        username: '',
        password: '',
      };



    render() {
        return (
            <Fragment>
                <h3> SignIn</h3>

                <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="username" />
                  <input
                    name="username"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="password" />
                  <input
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    type="password"
                  />
                </div>
      
                <div>
                  <button type="submit"> Sign In - LOGIN !!! </button>
                </div>
              </form>



            </Fragment>


        )
    }

    handleInputChange = event => {
        console.log('inputChange');
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
    handleSubmit = async event => {
        event.preventDefault();

        const {username, password } = this.state;

      if(username && password) {

        console.log(" Logged IN NOW !!!");
        console.log(this.state);
        try{
          // after putting in helper  we can replace this
              //  const endpoint = "http://localhost:5000/api/auth/login"
              // const result = await axios.post(endpoint, {
                  const result = await api.post('/login', {
              username,
              password,
          })           
           console.log(' LOGIN result is ',result);
          // Now for the good part !!!
          localStorage.setItem('token',  result.data.token);  // changed from jwt to token
                                                                // result.data.authToken to 
         }  catch (err) {
             console.log(err);
         }
      } else {
        console.log("blank creds attempt at LOGIN")
        this.setState({
          username: '',
          password: '',
        })

        return <h1>  Enter ALL Login CREDS !!</h1>
      }


    };   



      /* from TK
      handleSubmit = event => {
        event.preventDefault();
        console.log("submitted");
        console.log(this.state);
        // point this to the login endpoint in your API
        const endpoint = 'http://localhost:5001/api/login';
    
        axios
          .post(endpoint, this.state)
          .then(res => {
              console.log("res data >>> \n", res.data);
            // store the token to local storage
            localStorage.setItem('jwt', res.data.authToken);
          })
          .catch(error => console.error(error.response));
      };
      */


}

export default SignIn;