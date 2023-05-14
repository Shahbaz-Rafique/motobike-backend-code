const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var sellerId=req.query.sellerid;
console.log(sellerId);
var query=`SELECT * FROM ProductsOfSeller where SellerId='${sellerId}'`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;