const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var query=`SELECT OrderDetails.Id, seller.Name AS SellerName, users.username
, OrderDetails.ProductId, OrderDetails.Quantity
, OrderDetails.ProductSize, OrderDetails.ProductColor
, OrderDetails.TotalPrice, OrderDetails.DiscountPercentage
, OrderDetails.OrderDate, Products.ProductName
, (OrderDetails.TotalPrice * 0.9) AS PricetoSeller
, (OrderDetails.TotalPrice * 0.1) AS PricetoAdmin
, PaymentDetails.PaymentStatusId AS PaymentStatus
FROM OrderDetails
JOIN CustomerOrder ON CustomerOrder.OrderId = OrderDetails.Id
JOIN PaymentDetails ON PaymentDetails.CustomerOrderId = CustomerOrder.OrderId
JOIN Products ON Products.Id = OrderDetails.ProductId
JOIN SellerProducts ON SellerProducts.ProductId = Products.Id
JOIN seller ON SellerProducts.SellerId = seller.userId
JOIN Customers ON Customers.Id = CustomerOrder.CustomerId
JOIN users ON users.Id = Customers.userId;`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;