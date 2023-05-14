const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {Addtocart}=require('./classes');
const {CustomerAddtocart}=require('./classes'); 
const axios = require('axios');

router.get('/',(req,res,next)=>{
    try{
    connection.beginTransaction();
     var productid=req.query.productid;
     var quantity=req.query.quantity;
     var color=req.query.color;
     var size=req.query.size;
     var customerid=req.query.customerid;
     var colorid=0;
     var sizeid=0; 
     connection.query(`SELECT AddtoCart.Id as Id from AddtoCart JOIN CustomerAddtoCart Where AddtoCart.ProductId=${productid} and CustomerAddtoCart.CustomerId=${customerid}`,(err,result)=>{
         if(err) throw err;
         else{
             if(result.length>0){
             res.send('already');
             }
             else{
                connection.query(`SELECT Id FROM Color where color='${color}'`,(err,result)=>{
                    if (err) throw err;
                    else{
                       colorid=result[0].Id;
                       connection.query(`SELECT Id from Size where size='${size}'`,(err,result)=>{
                           if (err) throw err;
                           else{
                               sizeid=result[0].Id;
                               const add=new Addtocart(productid,colorid,sizeid,quantity);
                               const addtocart={
                                   ProductId:add.productid,
                                   ColorId:add.colorid,
                                   SizeId:add.sizeid,
                                   Quantity:add.quantity
                               }
                               connection.query('INSERT INTO AddtoCart SET ?',addtocart,(err,result)=>{
                                   if(err) throw err;
                                   else{
                                       connection.query('SELECT MAX(Id) as Id from AddtoCart',(err,result)=>{
                                           if (err) throw err;
                                           else{
                                               const cart=new CustomerAddtocart(customerid,result[0].Id);
                                               const addnow={
                                                   CustomerId:cart.customerid,
                                                   AddtoCartId:cart.addtocartid,
                                               }
                                               connection.query('INSERT INTO CustomerAddtoCart SET ?',addnow,(err,result)=>{
                                                   if (err) throw err;
                                                   else{
                                                       console.log('Data inserted');
                                                       connection.commit();
                                                       res.send('ok');
                                                   }
                                               })
                                           }
                                       })
                                   }
                               })
                           }
                       })
                    }
                })
             }
         }
     })
    }
    catch{
        connection.rollback();
    }
})
  module.exports = router;


