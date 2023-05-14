const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var query=`SELECT users.Id as Sellerid,Products.ProductName,(SELECT COUNT(Rating.Id) FROM Rating WHERE Rating.RatingScale=5 and Rating.RatingProductId=Products.Id) As 'five',(SELECT COUNT(Rating.Id) FROM Rating WHERE Rating.RatingScale=5 and Rating.RatingProductId=Products.Id) As 'four',(SELECT COUNT(Rating.Id) FROM Rating WHERE Rating.RatingScale=3 and Rating.RatingProductId=Products.Id) As 'three',(SELECT COUNT(Rating.Id) FROM Rating WHERE Rating.RatingScale=2 and Rating.RatingProductId=Products.Id) As 'two',(SELECT COUNT(Rating.Id) FROM Rating WHERE Rating.RatingScale=1 and Rating.RatingProductId=Products.Id) As 'one',(SELECT ROUND(((SELECT SUM(RatingScale) from Rating Where RatingProductId=Products.Id)/(select COUNT(RatingScale) from Rating Where RatingProductId=Products.Id)), 1) as ProductRating FROM Rating where RatingProductId=Products.Id) As AverageRating
    FROM Rating
    RIGHT JOIN Products
    on Products.Id=Rating.RatingProductId
    JOIN SellerProducts on SellerProducts.ProductId=Products.Id
    JOIN users on users.Id=SellerProducts.SellerId`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;