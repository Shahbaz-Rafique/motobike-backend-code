const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var productid=req.query.productid;
const now=new Date();
var query=`SELECT *
          FROM Sales
          JOIN Products ON Products.Id = Sales.ProductId
          WHERE Sales.ProductId = ${productid}
          AND Sales.SaleDate >= DATE\_SUB('${now.toISOString()}', INTERVAL 7 DAY)`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;