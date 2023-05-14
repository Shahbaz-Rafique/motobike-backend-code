const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
var multer=require("multer");
const {storage}=require('../multer/upload')
var upload = multer({ storage });

router.post('/',upload.single('adminimg'),(req,res,next)=>{
    var name=req.body.name;
    var email=req.body.email;
    var contact=req.body.contact;
    var cnic=req.body.cnic;
    var address=req.body.address;
    var city=req.body.city;
    var state=req.body.state;
    var country=req.body.country;
    var username=req.body.username;
    var password=req.body.sellerpassword;
    var Id=req.query.id;
    const now = new Date();
    const dateUpdated = strftime('%Y-%m-%d %H:%M:%S', now); 
    if(req.file){
        connection.query(`UPDATE Admin SET Name='${name}',Contact='${contact}',CNIC='${cnic}',Address='${address}',City='${city}',State='${state}',Country='${country}',Image='${req.file.filename}' Where userId=${Id}`, (err, result) => {
        if (err) throw err;
        else{
            var query=`UPDATE users SET username='${username}',password='${password}',email='${email}',dateUpdated='${dateUpdated}' Where Id=${Id}`;
            connection.query(query, (err, result) => {
                if (err) throw err;
                else{
                    console.log('Data has updated');
                    res.redirect("http://localhost:3000/admin-profile?update=true");
                }
                });
        }
      });
    }
    else{
        connection.query(`UPDATE Admin SET Name='${name}',Contact='${contact}',CNIC='${cnic}',Address='${address}',City='${city}',State='${state}',Country='${country}' Where userId=${Id}`, (err, result) => {
            if (err) throw err;
            else{
                var query=`UPDATE users SET username='${username}',password='${password}',email='${email}',dateUpdated='${dateUpdated}' Where Id=${Id}`;
                connection.query(query, (err, result) => {
                    if (err) throw err;
                    else{
                        console.log('Data has updated');
                        res.redirect("http://localhost:3000/admin-profile");
                    }
                    });
            }
          });
    }
  })
  module.exports = router;


