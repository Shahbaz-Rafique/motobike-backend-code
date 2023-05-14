const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {Shipping}=require('./classes');
const {CustomerShipping}=require('./classes');
const {OrderDetails}=require('./classes');
const {CustomerOrder}=require('./classes');
const {PaymentDetails}=require('./classes');
const stripe = require('stripe')('sk_test_51Lb0MgLqytPq2KPtYsqH3f4aQIpopsJbMcrAXdbuZOq4DaOihLNLtPyVc1uzwBnAyS3I6YEHQghIsUeb4cFGTyXy00Tnm9XavZ');

router.post('/',(req,res,next)=>{
    try{
    connection.beginTransaction();
     var address=req.body.address;
     var city=req.body.city;
     var state=req.body.state;
     var country=req.body.country;
     var postcode=req.body.postcode;
     var productid=req.query.productid;
     var quantity=req.query.quantity;
     var color=req.query.color;
     var size=req.query.size;
     let salepercentage=req.query.salepercentage;
     var customerid=req.query.customerid;
     var sale=0;
     console.log(salepercentage);
     if(salepercentage=="null"){
        sale=0;
     }
     else{
        sale=req.query.salepercentage;
     }
     const now = new Date();
     const dated = strftime('%Y-%m-%d %H:%M:%S', now); 
     const ship=new Shipping(address,city,state,country,postcode);
     const data={
        ShippingAddress:ship.shippingaddress,
        ShippingCity:ship.city,
        ShippingState:ship.state,
        ShippingCountry:ship.country,
        PostalCode:ship.postcode,
     }
     var image="";
     var name="";
     var unitprice=0;
     var COLORID=0;
     connection.query(`SELECT ProductImage,ProductName from Products Where Id=${productid}`,(err,result)=>{
         if (err) throw err;
         else{
            image=result[0].ProductImage;
            name=result[0].ProductName;
         }
     })
     connection.query(`SELECT Id from Color Where color='${color}'`,(err,result)=>{
        if(err) throw err;
        else{
            COLORID=result[0].Id;
            connection.query(`SELECT Quantity FROM ProductColors Where ColorId=${COLORID} and ProductId=${productid}`,(err,results)=>{
                if(err) throw err;
                else{
                    console.log(results);
                    if(parseInt(results[0].Quantity)-quantity>=0){
                       connection.query('INSERT into ShippingDetails SET ?',data,(err,result)=>{
                           if (err) throw err;
                           else{
                               connection.query('SELECT Max(Id) as Id from ShippingDetails',(err,result)=>{
                                   if(err) throw err;
                                   else{
                                       const customershipping=new CustomerShipping(customerid,result[0].Id);
                                       var DATA={
                                          ShippingId:customershipping.shippingid,
                                          CustomerId:customershipping.customerid
                                       }
                                       connection.query('INSERT INTO CustomerShipping SET ?',DATA,(err,result)=>{
                                           if (err) throw err;
                                           else{
                                               connection.query(`SELECT Price from Products where Id=${productid}`,(err,result)=>{
                                                   if (err) throw err;
                                                   else{
                                                      unitprice=result[0].Price-(result[0].Price*(sale/100));
                                                      const orderdetails=new OrderDetails(productid,quantity,size,color,((result[0].Price-(result[0].Price*(sale/100)))*quantity),sale,dated);
                                                      const order={
                                                          ProductId:orderdetails.productid,
                                                          Quantity:orderdetails.quantity,
                                                          ProductSize:orderdetails.productsize,
                                                          ProductColor:orderdetails.productcolor,
                                                          TotalPrice:orderdetails.totalprice,
                                                          DiscountPercentage:orderdetails.discount,
                                                          OrderDate:orderdetails.orderdate,
                                                      }
                                                      connection.query('INSERT into OrderDetails SET ?',order,(err,result)=>{
                                                          if (err) throw err;
                                                          else{
                                                              connection.query('SELECT MAX(Id) as Id from OrderDetails',(err,result)=>{
                                                                  if (err) throw err;
                                                                  else{
                                                                      const customerorder=new CustomerOrder(result[0].Id,customerid);
                                                                      const custOrder={
                                                                          CustomerId:customerorder.customerid,
                                                                          OrderId:customerorder.orderid,
                                                                      }
                                                                      connection.query('INSERT into CustomerOrder SET ?',custOrder,(err,result)=>{
                                                                          var cid=0;
                                                                          if (err) throw err;
                                                                          else{
                                                                              connection.query('SELECT MAX(Id) as Id from CustomerOrder',(err,result)=>{
                                                                                  cid=result[0].Id;
                                                                                  if (err) throw err;
                                                                                  else{
                                                                                      var status=2;
                                                                                      const payment=new PaymentDetails(result[0].Id,dated,status);
                                                                                      const paymentdet={
                                                                                          CustomerOrderId:payment.customerorderid,
                                                                                          PaymentDate:payment.paymentdate,
                                                                                          PaymentStatusId:payment.paymentstatusid,
                                                                                      }
                                                                                      connection.query(`UPDATE ProductColors SET Quantity=Quantity-${quantity} Where ProductId=${productid} and ColorId=${COLORID}`,(err,result)=>{
                                                                                      if(err) throw err;
                                                                                      else{                                                                                      
                                                                                      connection.query("INSERT INTO PaymentDetails SET ?",paymentdet,(err,result)=>{
                                                                                          if (err) throw err;
                                                                                          else{
                                                                                              console.log("inserted");
                                                                                              async function createCheckoutSession() {
                                                                                                  const session = await stripe.checkout.sessions.create({
                                                                                                    payment_method_types: ['card'],
                                                                                                    line_items: [
                                                                                                      {
                                                                                                        price_data: {
                                                                                                          currency: 'pkr',
                                                                                                          product_data: {
                                                                                                              name: `${name}`,
                                                                                                            },
                                                                                                          unit_amount: unitprice*100,
                                                                                                        },
                                                                                                        quantity: quantity,
                                                                                                      },
                                                                                                    ],
                                                                                                    mode: 'payment',
                                                                                                    success_url: `http://localhost:4000/success?session_id={CHECKOUT_SESSION_ID}&customerorderid=${cid}`,
                                                                                                    cancel_url: 'http://localhost:3001/cancel',
                                                                                                  });
                                                                                                  return session.url;
                                                                                                }
                                                                                                createCheckoutSession()
                                                                                              .then((url) => {
                                                                                                  connection.commit();
                                                                                                  res.redirect(url)
                                                                                                })
                                                                                              .catch((error) => console.error(error));
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
                                       })
                                   }
                               })
                           }
                       })
                    }
                    else{
                        res.redirect(`http://localhost:3001/cart-shipping?productid=${productid}&quantity=${quantity}&size=${size}&color=${color}&salepercentage=${salepercentage}&quantitystatus=less`)
                    }
                }
            })
        }
    });
}
catch{
    connection.rollback();
}
})
  module.exports = router;


