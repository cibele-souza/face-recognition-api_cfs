/* Planning of the server API (plan all the endpoints we have to create in our server)
/ ------------------------------

/ --> res = this is working
/signin --> POST = success / fail (we have to create a POST so it can "hide" password)
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/


const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const port = process.env.PORT || 4000

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,              // '127.0.0.1' corresponds to localhost
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
  },
});


app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})

app.use (express.json());   // use it to parse the json request that the server receive
app.use(cors());


// ROOT
app.get ('/', (req, res) => {
    res.send('success');
})


// SIGNIN
app.post ('/signin', signin.handleSignin(db, bcrypt));
    // another way of coding it, as a compoused function


// REGISTER : a new user will be created and add to the database
app.post ('/register', (req, res) => { register.handleRegister (req, res, db, bcrypt) });
                                    // dependency injection: we pass what the handleRegister function needs to run this way


// PROFILE
app.get ('/profile/:id', (req, res) => { profile.handleProfileGet (req, res, db)});


// IMAGE : will increase the entries count each time the user submit an image
// IMAGEURL : will handle the API request in the backend
app.put ('/image', (req, res) => { image.handleImage (req, res, db)});
app.post ('/imageurl', (req, res) => { image.handleApiCall (req, res)});



