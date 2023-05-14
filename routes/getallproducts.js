const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var date=Date.now();
var query=`SELECT DISTINCT *,Products.Id as SelectedProduct from Products JOIN SellerProducts on Products.Id=SellerProducts.ProductId JOIN Category on Category.Id=Products.CategoryId JOIN seller on seller.userId=SellerProducts.SellerId LEFT JOIN ProductSales on ProductSales.ProductId=Products.Id LEFT JOIN Sales on ProductSales.SalesId=Sales.Id where seller.MembershipStatus='active'`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;