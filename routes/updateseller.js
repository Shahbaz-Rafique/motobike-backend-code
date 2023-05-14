const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {Seller}=require('./classes');
const {User}=require('./classes');
var multer=require("multer");
const {storage}=require('../multer/upload')
var upload = multer({ storage });

router.post('/',upload.single("sellerimg"),(req,res,next)=>{
    var Id=req.query.id;
    var username=req.body.name; 
    var email=req.body.email; 
    var contact=req.body.contact;
    var cnic=req.body.cnic;
    var address=req.body.address;
    var city=req.body.city;
    var state=req.body.state;
    var country=req.body.country;
     const now = new Date();
    const dateUpdated = strftime('%Y-%m-%d %H:%M:%S', now); 
    if(req.file){
        var query=`UPDATE seller set Image='${req.file.filename}',Name='${username}',Contact='${contact}',CNIC='${cnic}',Address='${address}',City='${city}',State='${state}',Country='${country}' where userId='${Id}'`
        connection.query(query, (err, result) => {
            if (err) throw err;
            else{
                var query=`UPDATE users set email='${email}',dateUpdated='${dateUpdated}' Where Id='${Id}'`;
                connection.query(query, (err, result) => {
                    if (err) throw err;
                    else{
                        console.log('Data has updated');
                        res.redirect("http://localhost:3000/view-seller?update=true");
                    }
                  });
            }
          });
    } 
    else{
        var query=`UPDATE seller set Name='${username}',Contact='${contact}',CNIC='${cnic}',Address='${address}',City='${city}',State='${state}',Country='${country}' where userId='${Id}'`
        connection.query(query, (err, result) => {
            if (err) throw err;
            else{
                var query=`UPDATE users set email='${email}',dateUpdated='${dateUpdated}' Where Id='${Id}'`;
                connection.query(query, (err, result) => {
                    if (err) throw err;
                    else{
                        console.log('Data has updated');
                        res.redirect("http://localhost:3000/view-seller?update=true");
                    }
                  });
            }
          });
    }
  })
  module.exports = router;


