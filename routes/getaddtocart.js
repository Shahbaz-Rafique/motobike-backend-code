const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    var id=req.query.customerid;
    var query=`SELECT AddtoCart.Id, AddtoCart.ProductId, Products.ProductName
    , Products.ProductImage, Products.Price, Size.size, Color.color
    , AddtoCart.Quantity, Products.CategoryId
    FROM AddtoCart
    JOIN CustomerAddtoCart ON CustomerAddtoCart.AddtoCartId = AddtoCart.Id
    JOIN Products ON Products.Id = AddtoCart.ProductId
    JOIN Size ON Size.Id = AddtoCart.SizeId
    JOIN Color ON Color.Id = AddtoCart.ColorId
    WHERE CustomerAddtoCart.CustomerId = ${id}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;