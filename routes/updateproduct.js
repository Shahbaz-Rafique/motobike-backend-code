const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
var multer=require("multer");
const {storage}=require('../multer/upload')
var upload = multer({ storage });

router.post('/',upload.single("productimg"),(req,res,next)=>{
    var Id=req.query.id;
    var name=req.body.productname;
    var manufacturer=req.body.manufacturer;
    var description=req.body.description;
    var model=req.body.model;
    var price=req.body.price;
    var quantity=req.body.Quantity;
    var category=req.query.category;
    const now = new Date();
    const dateUpdated = strftime('%Y-%m-%d %H:%M:%S', now); 
    var query=`Select Id from Category where CategoryName='${category}'`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        else{
            if(req.file){
                const image=req.file.filename;
                var query=`UPDATE Products set ProductImage='${image}',ProductName='${name}',Description='${description}',Manufacturer='${manufacturer}',Model='${model}',Categoryid='${result[0].Id}',Price='${price}',dateUpdated='${dateUpdated}' where Id=${Id}`
                connection.query(query, (err, result) => {
                    if (err) throw err;
                    else{
                        console.log('Data has updated');
                        res.redirect("http://localhost:3000/view-product?update=true");
                    }
                  });
            } 
            else{
                var query=`UPDATE Products set ProductName='${name}',Description='${description}',Manufacturer='${manufacturer}',Model='${model}',Categoryid='${result[0].Id}',Price='${price}',dateUpdated='${dateUpdated}' where Id=${Id}`
                connection.query(query, (err, result) => {
                    if (err) throw err;
                    else{
                        console.log('Data has updated');
                        res.redirect("http://localhost:3000/view-product?update=true");
                    }
                  });
            }
        }
      });
  })
  module.exports = router;


