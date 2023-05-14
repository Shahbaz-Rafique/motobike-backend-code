const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var id=req.query.id;
var status=req.query.status;
var portal=req.query.portal;
connection.query(`UPDATE Products Set Availability='${status}' Where Id=${id}`,(err,result)=>{
  if(err) throw err;
  else{
    if(portal=="seller"){
    res.redirect(`http://localhost:3000/view-product?delete=${status}`);
    }
    else if(portal=="admin"){
      res.redirect(`http://localhost:3000/view-all-products?delete=${status}`)
    }
  }
})
})
module.exports = router;