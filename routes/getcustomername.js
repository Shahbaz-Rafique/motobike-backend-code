const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    var id=req.query.sellerid; 
    var query=`SELECT DISTINCT CustomerSupport.FromId,users.username,CustomerSupport.ToId FROM CustomerSupport JOIN Customers on Customers.Id=CustomerSupport.FromId Join users on users.Id=Customers.userId Where FromId=${id} or ToId=${id}`;
    connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;