const express = require('express');
const path = require('path');
const mysql = require('mysql');
const router = express.Router();


let con = mysql.createConnection(require('./config/mysql.js'));

// Routes
router.post('/authentication', (req, res) => {
  let query = `SELECT COUNT(*) FROM users Where username="${req.body.username}" and password= "${req.body.password}"`;
  con.query(query, (err, result, fields) => {
    if (err) {
      console.log(err);
    }
    if (!err) {
      if (result[0]['COUNT(*)'] > 0) {
        req.session.username = req.body.username;
        res.status(200).send();
      } else {
        res.status(401).send();
      }
    }
  });
});


// Export all Routes through the router object
module.exports = router;