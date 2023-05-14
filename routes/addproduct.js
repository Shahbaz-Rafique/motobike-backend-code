const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {Product}=require('./classes');
var multer=require("multer");
const {storage}=require('../multer/upload')
var upload = multer({ storage });

router.post('/',upload.single("productimg"),(req,res,next)=>{
  try{
      connection.beginTransaction()
      const encodedcolors= req.query.colors;
      const decodedcolors = JSON.parse(decodeURIComponent(encodedcolors));
      const encodedsizes = req.query.sizes;
      const decodedsizes = JSON.parse(decodeURIComponent(encodedsizes));
      var name=req.body.productname;
      var manufacturer=req.body.manufacturer;
      var description=req.body.description;
      var model=req.body.model;
      var price=req.body.price;
      var quantity=req.body.Quantity;
      var sellerid=req.query.sellerid;
      var category=req.query.category;
      const now = new Date();
      const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now); 
      const dateUpdated = strftime('%Y-%m-%d %H:%M:%S', now); 
      const image=req.file.filename;
      var availability="Available";
      var query=`Select Id from Category where CategoryName='${category}'`;
      connection.query(query, (error, results, fields) => {
          if (error) {
            console.error('Failed to execute the query:', error);
            return;
          }
          else{
              const product=new Product(name,description,manufacturer,model,results[0].Id,price,image,availability,dateCreated,dateUpdated);
              const details={
                  ProductName: product.name,
                  description: product.description,
                  manufacturer:product.manufacturer,
                  model : product.model,
                  categoryid : results[0].Id,
                  price:product.price,
                  ProductImage:product.image,
                  availability:product.availability,
                  dateCreated:product.dateCreated,
                  dateUpdated:product.dateUpdated,
              }
    connection.query('INSERT INTO Products SET ?', details, (err, result) => {
      if (err) throw err;
      else{
        connection.query(`Select Max(Id) as Id from Products`, (error, results, fields) => {
            if (error) {
              console.error('Failed to execute the query:', error);
              return;
            }
            else{
              var PID=parseInt(results[0].Id);
              var redirect=0;
              const sellerproduct = {
                ProductId:PID,
                SellerId:sellerid,
                };
                connection.query('INSERT INTO SellerProducts SET ?', sellerproduct, (err, result) => {
                  if (err) throw err;
                  else{                 
                    for(let i=0;i<decodedsizes.length;i++){
                      redirect++;
                      var query=`SELECT Id from Size where size='${decodedsizes[i]}'`;
                      connection.query(query, (err, Sresults, fields) => {
                        if (err) throw err;
                        else{
                          console.log(i+ "size:"+Sresults[0].Id);
                          const ProductSize={
                            ProductId:PID,
                            SizeId:parseInt(Sresults[0].Id),
                          }
                          console.log("sizeobject",ProductSize);
                          connection.query('INSERT INTO ProductSizes SET?',ProductSize,(err,result)=>{
                            if (err) throw err;
                          })
                        }
                      });
                    }
                    for(let i=0;i<decodedcolors.length;i++){
                      redirect++;
                      var query=`SELECT Id from Color where color='${decodedcolors[i]}'`;
                      connection.query(query, (err, Cresults, fields) => {
                        if (err) throw err;
                        else{
                            const ProductColor={
                              ProductId:PID,
                              ColorId:parseInt(Cresults[0].Id),
                              Quantity:parseInt(quantity),
                            }
                            connection.query('INSERT INTO ProductColors SET ?',ProductColor,(err,result)=>{
                              if (err) throw err;
                            })
                        }
                      });
                    }
                    if(redirect==decodedcolors.length+decodedsizes.length){
                      console.log('Data inserted successfully!');
                      connection.commit();
                      res.redirect("http://localhost:3000/add-product?add=true");
                    }  
                }
              });
            }
          });
        }
      });
    }
  });
  }
  catch{
    connection.rollback();
  }
})
  module.exports = router;


