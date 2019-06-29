const axios = require('axios');
const bcrypt = require("bcryptjs"); // added
const jwt = require("jsonwebtoken"); // added
const secrets = require("../config/secrets.js"); // added
const Users = require("./routes-model.js"); // added


const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration




  
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}



function generateToken (user) {
  // ADD our JWT token, exp & iat are autimatically added
  return jwt.sign({
    userId: user.id,
    name: user.username,
    userRole: 'student',
//   }, 'super secret',   // secret  CAN"T KEEP this in CODE, MUST move to .env
  }, secrets.jwtSecret,
    { expiresIn: '1h'},   // added expiration in 1 hour
  )  

}
