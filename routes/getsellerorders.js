const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var id=req.query.id; 
var query=`select OrderDetails.Id AS Id,seller.userId AS userId
,users.username AS username,OrderDetails.ProductId AS ProductId
,OrderDetails.Quantity AS Quantity,OrderDetails.ProductSize AS ProductSize
,OrderDetails.ProductColor AS ProductColor,OrderDetails.TotalPrice AS TotalPrice,
OrderDetails.DiscountPercentage AS DiscountPercentage,OrderDetails.OrderDate AS OrderDate
,Products.ProductName AS ProductName,(.OrderDetails.TotalPrice * 0.9) AS PricetoSeller
,(.OrderDetails.TotalPrice * 0.1) AS PricetoAdmin,PaymentDetails.PaymentStatusId AS PaymentStatus
from (((((((.OrderDetails join .CustomerOrder on((.CustomerOrder.OrderId = .OrderDetails.Id)))
join .PaymentDetails on((.PaymentDetails.CustomerOrderId = .CustomerOrder.OrderId)))
join .Products on((.Products.Id = .OrderDetails.ProductId)))
join .SellerProducts on((.SellerProducts.ProductId = .Products.Id)))
join .seller on((.SellerProducts.SellerId = .seller.userId)))
join .Customers on((.Customers.Id = .CustomerOrder.CustomerId)))
join .users on((.users.Id = .Customers.userId))) WHERE userId  = ${id}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);  
  });
})
module.exports = router;