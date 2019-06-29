const axios = require('axios');
const bcrypt = require("bcryptjs");


// ADD THIS
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("./routes-model.js");

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
 
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      const token = generateToken(user);
      res.status(201).json({ saved, message: `registered with JWT token, ${token}` });
    })
    .catch(error => {
      res.status(500).json({error, message: 'Error registering user'});
    });
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Hey Sprinter ${user.username}!, this is your JWT token for Jokes >>`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials, YOU SHALL NOT PASS !!! (hacker) ' });
      }
    })
    .catch(error => {
      res.status(500).json(error); 
    });
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