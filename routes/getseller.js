const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var query=`select seller.userId AS userId,seller.Image AS Image,seller.Name AS Name
,seller.Contact AS Contact
,seller.CNIC AS CNIC,seller.Address AS Address,seller.City AS City
,seller.State AS State
,seller.Country AS Country,seller.MembershipStatus AS MembershipStatus
,users.username AS username
,users.email AS email,users.password AS password
,users.role AS role,users.emailverification AS emailverification
,users.dateCreated AS dateCreated
,users.dateUpdated AS dateUpdated from (seller join users
on((users.Id = seller.userId)))`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;