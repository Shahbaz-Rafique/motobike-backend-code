const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var productid=req.query.productid;
var query=`SELECT * from Reviews JOIN CustomerReview on CustomerReview.ReviewId=Reviews.Id JOIN Customers on Customers.Id=CustomerReview.CustomerId JOIN users on users.Id=Customers.userId JOIN Rating on Rating.Id=Reviews.RatingId Where Rating.RatingProductId=${productid}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;