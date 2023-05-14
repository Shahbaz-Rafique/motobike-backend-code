const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {Rating}=require('./classes');
const {Review}=require('./classes');
const {CustomerRating}=require('./classes');
const {CustomerReview}=require('./classes');
const {SellerRating}=require('./classes');


router.post('/',(req,res,next)=>{
     var ratingscale=req.query.rating;
     var customerid=parseInt(req.query.customerid);
     var productid=req.query.productid;
     var categoryid=req.query.categoryid;
     var sellerid=req.query.sellerId;
     var review=req.body.reviewtext;
     const now = new Date();
     const rating=new Rating(productid,ratingscale);
     const rate={
        RatingProductId:rating.productid,
        RatingScale:rating.RatingScale,
     }
     connection.query(`SELECT CustomerOrder.Id AS Id from CustomerOrder join OrderDetails on OrderDetails.Id = CustomerOrder.OrderId Where CustomerOrder.CustomerId=${customerid} and OrderDetails.ProductId=${productid}`,(err,result)=>{
         if (err) throw err;
         else{
             if(result.length==0){
                 res.redirect(`http://localhost:3001/product-details?id=${productid}&categoryid=${categoryid}&review=false`)
             }
             else{
                connection.query('INSERT into Rating SET ?',rate,(err,result)=>{
                    if (err) throw err;
                    else{
                        connection.query('SELECT MAX(Id) as Id from Rating',(err,result)=>{
                            var rateid=result[0].Id;
                            if(err) throw err;
                            else{
                                const rev=new Review(result[0].Id,review,now);
                                const reviewobj={
                                    RatingId:rev.ratingid,
                                    ReviewText:rev.reviewtext,
                                    Dated:rev.dated,
                                }
                                connection.query('INSERT into Reviews SET ?',reviewobj,(err,result)=>{
                                    if (err) throw err;
                                    else{
                                        const custrating=new CustomerRating(customerid,rateid);
                                        const cust={
                                            CustomerId:custrating.customerid,
                                            RatingId:custrating.ratingid,
                                        }
                                        connection.query('INSERT into CustomerRating SET ?',cust,(err,result)=>{
                                            if (err) throw err;
                                            else{
                                                connection.query('SELECT Max(Id) as Id from Reviews',(err,result)=>{
                                                    if(err) throw err;
                                                    else{
                                                        const custreview=new CustomerReview(customerid,result[0].Id);
                                                        const custrev={
                                                            CustomerId:custreview.customerid,
                                                            ReviewId:custreview.reviewid,
                                                        }
                                                        connection.query('INSERT into CustomerReview SET ?',custrev,(err,result)=>{
                                                            if(err) throw err;
                                                            else{
                                                                const sellerrating=new SellerRating(sellerid,rateid);
                                                                const sellrating={
                                                                    SellerId:sellerrating.sellerid,
                                                                    RatingId:sellerrating.ratingid,
                                                                }
                                                                connection.query('INSERT into SellerRating SET ?',sellrating,(err,result)=>{
                                                                    if (err) throw err;
                                                                    else{
                                                                        console.log("data inserted successfully");
                                                                        return res.redirect(`http://localhost:3001/product-details?id=${productid}&categoryid=${categoryid}`)
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
                        })
                    }
                 })
             }
         }
     })
})
  module.exports = router;


