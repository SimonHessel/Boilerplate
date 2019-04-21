const express = require('express');
const path = require('path');
const router = express.Router();
const ejs = require('ejs');

//Authentication
router.use('/', function(req, res, next) {
  // checking if user is authenticated
  if (req.session.username || req.url === "/login") {
    next();
  } else {
    res.redirect('/login');
  }
});

// Create Route with URL ="/"
//return index.html from tempaltes folder
router.get('/', (req, res) => {
  const username = req.session.username;
  console.log(username);
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'dashboard.html'));
});

//login
router.get('/login', (req, res) => {
  if (req.session.username) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, 'templates', 'login.html'));
  }
});





// Export all Routes through the router object
module.exports = router;