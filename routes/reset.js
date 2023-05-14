const express = require('express');
var router = express.Router();
const crypto = require('crypto');
const {connection}=require('../database/sql');

function sha256(text) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
  }  

router.post('/',(req,res,next)=>{
    var code=req.body.code;
    var cpassword=req.body.cpassword;
    var verificationcode=req.query.verify;
    var email=req.query.email;
    if(sha256(code)==verificationcode){
        var query=`UPDATE users SET password=${cpassword} Where email='${email}'`;
        connection.query(query, (err, result) => {
        if (err) throw err;
        else{
            console.log('Data has updated');
            res.redirect(`http://localhost:3001/login`);
        }
      });
    }
  })
  module.exports = router;


