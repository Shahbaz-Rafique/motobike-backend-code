const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var query=`SELECT 
    Products.ProductName,
    users.Id as SellerId,
    SUM(OrderDetails.Quantity) AS Quantity,
    SUM(OrderDetails.TotalPrice) AS PriceEarned,
    ((SUM(OrderDetails.Quantity) / (SELECT SUM(Quantity) FROM OrderDetails)) * 100) AS SellingPercentage,
    (SUM(OrderDetails.TotalPrice) * 0.1) AS PricetoAdmin,
    (SUM(OrderDetails.TotalPrice) * 0.9) AS PricetoSeller
    FROM 
    OrderDetails
    JOIN 
    CustomerOrder ON CustomerOrder.OrderId = OrderDetails.Id
    JOIN 
    PaymentDetails ON PaymentDetails.CustomerOrderId = CustomerOrder.Id
    JOIN 
    Products ON Products.Id = OrderDetails.ProductId
    JOIN 
    SellerProducts on SellerProducts.ProductId=Products.Id
    JOIN 
    users on users.Id=SellerProducts.SellerId
    GROUP BY 
    Products.Id`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;