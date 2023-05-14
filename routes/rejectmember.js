const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var id=req.query.id;
var query=`UPDATE seller Seller Set MembershipStatus='Rejected' where userId='${id}'`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    else{
        res.redirect("http://localhost:3000/memberships?reject=true");
    }
  });
});
module.exports = router;