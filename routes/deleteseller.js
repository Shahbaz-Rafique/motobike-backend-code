const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var id=req.query.id;
var status=req.query.status;
var query=`UPDATE seller SET MembershipStatus='${status}' where userId='${id}'`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    else{
      res.redirect(`http://localhost:3000/view-seller?delete=${status}`);
    }
  });
})
module.exports = router;