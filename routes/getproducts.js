const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var sellerId=req.query.sellerid;
console.log(sellerId);
var query=`select Products.Id AS ProductId,.Products.ProductName AS ProductName
,Products.Description AS Description,Products.Categoryid AS CategoryId
,Products.ProductImage AS ProductImage,Products.Price AS Price
,Products.Availability AS Availability,Products.Manufacturer AS Manufacturer
,Products.dateCreated AS dateCreated,Products.dateUpdated AS dateUpdated,Products.Model AS Model,.seller.userId AS SellerId
,Category.CategoryName AS CategoryName,.seller.userId AS userId
,seller.Image AS Image,seller.Name AS Name
,seller.Contact AS Contact,seller.CNIC AS CNIC
,seller.City AS City,seller.State AS State
,seller.Country AS Country,seller.MembershipStatus AS MembershipStatus
from (((.Products join .SellerProducts on((.Products.Id = .SellerProducts.ProductId)))
join .Category on((.Category.Id = .Products.Categoryid))) join .seller
on((.seller.userId = .SellerProducts.SellerId))) where SellerId='${sellerId}'`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;