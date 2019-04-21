// imports
const express = require('express');
const session = require('express-session');
const path = require('path');

//init the session folder
var FileStore = require('session-file-store')(session);

//init the app
const app = express();

//set bodyparser for json requests
app.use(express.json());

// Set session Middelware
// saves all cookies in sessions folder
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  maxAge: new Date(253402300000000),
  httpOnly: true,
  cookie: {
    path: '/',
    httpOnly: true,
    expires: new Date(253402300000000)
  },
  store: new FileStore()
}));


// all files in the static folder are served directly
app.use(express.static(path.join(__dirname, 'static')));

//importing all routes from api.js -> all routes are starting with /api/
app.use('/api', require('./api.js'));

//importing all routes from template.js
app.use('/', require('./template.js'))

//Set port
const PORT = process.env.PORT || 8080;


//Run Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});