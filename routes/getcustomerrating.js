const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    var productid=req.query.productid;
    var query=`SELECT *
    FROM Rating
    JOIN CustomerRating ON CustomerRating.RatingId = Rating.Id
    JOIN Customers ON Customers.Id = CustomerRating.CustomerId
    LEFT JOIN users ON users.Id = Customers.userId
    WHERE Rating.RatingProductId = ${productid}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;