const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
    var Id=req.query.id;
    connection.query(`UPDATE seller SET MembershipStatus='active' where userId=${Id}`,(err,result)=>{
        if(err) throw err;
        else{
            res.redirect("http://localhost:3000/memberships?accept=true");
        }
    })
  })
  module.exports = router;


