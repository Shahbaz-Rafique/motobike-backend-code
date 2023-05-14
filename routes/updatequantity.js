const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.post('/',(req,res,next)=>{
    var quantity=req.body.quantity;
    var productid=req.query.proid;
    var colorid=req.query.colorid;
    var query=`UPDATE ProductColors SET Quantity=${quantity} where ProductId=${productid} and ColorId=${colorid}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        else{
            console.log('Data has updated');
            res.redirect(`http://localhost:3000/view-products/more-details?id=${productid}`);
        }
      });
  })
  module.exports = router;


