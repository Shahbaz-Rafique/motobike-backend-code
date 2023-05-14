const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
var multer=require("multer");
const {storage}=require('../multer/upload')
var upload = multer({ storage });

router.post('/',upload.single('customerimg'),(req,res,next)=>{
    var name=req.body.name;
    var email=req.body.email;
    var contact=req.body.contact;
    var address=req.body.address;
    var username=req.body.username;
    var password=req.body.sellerpassword;
    var Id=req.query.id;
    var userId=0;
    const now = new Date();
    const dateUpdated = strftime('%Y-%m-%d %H:%M:%S', now); 
    connection.query(`SELECT userId from Customers Where Id=${Id}`,(err,result)=>{
        if (err) throw err;
        else{
            userId=result[0].userId;
        }
    })
    if(req.file){
        connection.query(`UPDATE Customers SET Name='${name}',Contact='${contact}',Address='${address}',Image='${req.file.filename}' Where Id=${Id}`, (err, result) => {
        if (err) throw err;
        else{
            var query=`UPDATE users SET username='${username}',password='${password}',email='${email}',dateUpdated='${dateUpdated}' Where Id=${userId}`;
            connection.query(query, (err, result) => {
                if (err) throw err;
                else{
                    console.log('Data has updated');
                    res.redirect("http://localhost:3001/customer-profile?update=true");
                }
                });
        }
      });
    }
    else{
        connection.query(`UPDATE Customers SET Name='${name}',Contact='${contact}',Address='${address}' Where Id=${Id}`, (err, result) => {
            if (err) throw err;
            else{
                var query=`UPDATE users SET username='${username}',password='${password}',email='${email}',dateUpdated='${dateUpdated}' Where Id=${userId}`;
                connection.query(query, (err, result) => {
                    if (err) throw err;
                    else{
                        console.log('Data has updated');
                        res.redirect("http://localhost:3001/customer-profile?update=true");
                    }
                    });
            }
          });
    }
  })
  module.exports = router;


