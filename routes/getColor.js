const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var productid=req.query.productid;
var query=`select ProductColors.ProductId AS ProductId,ProductColors.ColorId AS ColorId
,ProductColors.Quantity AS Quantity,Color.color AS color
from (ProductColors join Color on((ProductColors.ColorId = Color.Id))) where ProductId=${productid}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;