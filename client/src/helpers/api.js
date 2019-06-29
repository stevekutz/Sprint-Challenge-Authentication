import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3300/api',   // change this too!!!
    headers: {
        authorization: localStorage.getItem('token'), // changed to token  & capitalized Authorization
    }

})

export default instance;