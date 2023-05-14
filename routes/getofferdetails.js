const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var productid=req.query.productid;
const now=new Date();
var query=`CALL GetSalesByProductAndDate('${productid}','${now.toISOString()}')`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results[0]);
  });
})
module.exports = router;