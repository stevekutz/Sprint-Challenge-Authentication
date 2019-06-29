import React from 'react';
import { Fragment } from 'react';
import api from '../helpers/api';
import withAuth from '../helpers/auth';



class Jokes extends React.Component {
    state = {
        jokes: [],   // NEVER FORGET to initialize state !!!!!
    }
    async componentDidMount() {
        try {
            const result = await api.get('/jokes');
            console.log(result);

            this.setState({
                
                jokes: result.data,
            })

        } catch (err) {
            console.error(err);
        }

    }
    
    /*
                <ul>
                    {this.state.users.map( (user, i) => {
                        return <li key = {i}>{user.username} </li>
                    })}
                
                </ul>
    */
    
    render() {
     /*   
        if(this.state.users === null) {
            return <p>  HAPPY !!!! </p>
        }
     */   
        return (
            <Fragment>
                <h3> Jokes</h3>
                <ul>
                {this.state.jokes.map( (item, i) => {
                    
                    
                    return <li key = {i}>{item.joke} </li>
                })}
            
            </ul>

            </Fragment>


        )
    }

}

export default withAuth(Jokes);