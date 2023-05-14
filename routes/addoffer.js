const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {Offer}=require('./classes');

router.post('/',(req,res,next)=>{
  try{
      connection.beginTransaction()
      const encodedoffers= req.query.offers;
      const decodedoffers = JSON.parse(decodeURIComponent(encodedoffers));
      const encodedall= req.query.allpro;
      const decodedall = JSON.parse(decodeURIComponent(encodedall));
      var isall=req.query.isall;
      var sellerid=req.query.sellerid;
      var title=req.body.title;
      var percentage=req.body.percentage;
      var start=req.body.start;
      var end=req.body.end;
      var createoffer=new Offer(title,percentage,start,end,sellerid);
      const offers={
        title: createoffer.title,
        salepercentage:parseInt(createoffer.percentage),
        startDate:createoffer.startdate,
        endDate:createoffer.enddate,
        sellerid:createoffer.sellerid,
      }
      var saleID=0;
      connection.query('INSERT INTO Sales SET ?', offers, (err, result) => {
        if (err) throw err;
        else{
          connection.query("Select Max(Id) as Id from Sales", (error, results, fields) => {
            saleID=results[0].Id;
            if (error) {
              console.error('Failed to execute the query:', error);
              return;
            }
            else{
              var redirect=true;
              if(isall=="yes"){
                for(let i=0;i<decodedall.length;i++){
                  connection.query(`SELECT Id from Products Where ProductName='${decodedall[i]}'`,(err,Presults)=>{
                    if(err){
                      redirect=false;
                      console.log(err);
                    }
                    else{
                      console.log(Presults);
                      const data = {
                        SalesId:parseInt(saleID),
                        ProductId:parseInt(Presults[0].Id),
                        };
                        connection.query('INSERT INTO ProductSales SET ?', data, (err, result) => {
                          if (err) {
                            redirect==false;
                            console.log(err);
                          };
                        });
                    }
                  })
              }
              }
              else{
                for(let i=0;i<decodedoffers.length;i++){
                  connection.query(`SELECT Id from Products Where ProductName='${decodedoffers[i]}'`,(err,Presults)=>{
                    if(err){
                      redirect=false;
                      console.log(err);
                    }
                    else{
                      const data = {
                        SalesId:parseInt(results[0].Id),
                        ProductId:parseInt(Presults[0].Id),
                        };
                        connection.query('INSERT INTO ProductSales SET ?', data, (err, result) => {
                          if (err) {
                            redirect==false;
                            console.log(err);
                          };
                        });
                    }
                  })
              }
              }
            if(redirect==true){
              console.log('Data inserted successfully!');
              connection.commit();
              res.redirect("http://localhost:3000/add-offer?add=true");
            }
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


