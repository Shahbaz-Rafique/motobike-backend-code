const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var productid=req.query.productid;
var query=`SELECT ROUND(((SELECT SUM(RatingScale) from Rating Where RatingProductId=${productid})/(select COUNT(RatingScale) from Rating Where RatingProductId=${productid})), 1) as ProductRating FROM Rating where RatingProductId=${productid}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results[0]);
  });
})
module.exports = router;