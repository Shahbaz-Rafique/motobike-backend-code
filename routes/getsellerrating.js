const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var sellerid=req.query.sellerid;
var query=`SELECT DISTINCT ((SELECT SUM(Rating.RatingScale)
            FROM SellerRating
            JOIN Rating on SellerRating.RatingId=Rating.Id
            WHERE SellerRating.SellerId=${sellerid})/
            (SELECT COUNT(*)
            from SellerRating
            Where SellerId=${sellerid})) as SellerRating
            FROM SellerRating`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;