const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var id=req.query.id;
var query=`DELETE FROM ProductSales Where SalesId=${id}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    else{
        var query=`DELETE FROM Sales Where Id=${id}`;
        connection.query(query, (error, results, fields) => {
            if (error) {
              console.error('Failed to execute the query:', error);
              return;
            }
            else{
                res.redirect("http://localhost:3000/view-sales?delete=true");
            }
          });
    }
  });
})
module.exports = router;