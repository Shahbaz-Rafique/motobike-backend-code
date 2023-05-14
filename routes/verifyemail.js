const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const {Customer}=require('./classes');
const crypto = require('crypto');

function sha256(text) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
  }
  
router.post('/',(req,res,next)=>{
    var email=req.query.email;
    var code=req.query.code;
    var verifycode=sha256(req.body.verify);
    if(code==verifycode){
    connection.query(`SELECT Id from users where email='${email}'`,(err,result)=>{
        var userid=result[0].Id;
        if (err) throw err;
        else{
            connection.query(`UPDATE users SET emailverification='verified' where Id=${result[0].Id}`,(err,result)=>{
                if(err) throw err;
                else{
                    const customer=new Customer(userid,null,null,null,null);
                    connection.query('INSERT into Customers SET ?', customer,(err,result)=>{
                        if(err) throw err;
                        else{
                            return res.redirect(`http://localhost:3001/login?verify=true`)
                        }
                    })
                }
            })
        }
    })
   }
   else{
       return res.redirect(`http://localhost:3001/verification?sent=${code}&email=${email}&verify=false`)
   }
  })
  module.exports = router;


