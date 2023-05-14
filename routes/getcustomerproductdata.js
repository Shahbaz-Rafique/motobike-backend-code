const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var catagoryindex=req.query.index;
console.log(catagoryindex);
var query=`SELECT *,Products.Id as ProductId from Products join Category on Products.Categoryid = Category.id where Category.id=${catagoryindex}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;