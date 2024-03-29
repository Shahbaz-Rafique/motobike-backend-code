const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var productid=req.query.productid;
var query=`select ProductSizes.ProductId AS ProductId,ProductSizes.SizeId AS SizeId
,Size.size AS size from (.ProductSizes join Size on
((.ProductSizes.SizeId = Size.Id))) Where ProductId=${productid}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;