// required installation of dependencies:
// npm i express   'for installing express'
// npm i mongoose  'mongoose is the middleman between our app and database'
// npm install --save express-validator  'for the validation required in the user fields'
// npm i -'D' nodemon   'nodemon can be used to run our app and get console logs in vscode itself'
// but in this case, need to add this line in scripts as 'nodemon .\index.js' was not working
//  "serve": "nodemon index.js",

// also added collections in the thunderclient to test our app

// importing connectToMongo function
const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

// to use json in our request body, need to call this function
app.use(express.json());

// our application endpoints
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// listening to our main endpoint
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})