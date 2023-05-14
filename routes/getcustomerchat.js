const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    var customer=req.query.customerid;
    var seller=req.query.sellerid;
    var query="";
    console.log(customer,seller);
    if(customer!="" && seller!=""){
      query=`SELECT * from CustomerSupport Where (FromId=${customer} or FromId=${seller}) & (ToId=${seller} or ToId=${customer})`;
    }
    else{
      query=`SELECT * from CustomerSupport Where (FromId=0 or FromId=0) & (ToId=0 or ToId=0)`;
    }
    connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;