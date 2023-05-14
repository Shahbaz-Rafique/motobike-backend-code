const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var productid=req.query.productid;
var query=`SELECT seller.Name,seller.Contact,((SELECT SUM(Rating.RatingScale) FROM SellerRating JOIN Rating on SellerRating.RatingId=Rating.Id WHERE SellerRating.SellerId=users.Id)/(SELECT COUNT(*) from SellerRating Where SellerId=users.Id)) as SellerRating FROM SellerRating RIGHT JOIN users on users.Id=SellerRating.SellerId JOIN seller on seller.userId=users.Id;`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;