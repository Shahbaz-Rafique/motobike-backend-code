const express = require('express');
var router = express.Router();
const strftime = require('strftime');
const {PaymentDetails}=require('./classes');
const {connection}=require('../database/sql');
const stripe = require('stripe')('sk_test_51Lb0MgLqytPq2KPtYsqH3f4aQIpopsJbMcrAXdbuZOq4DaOihLNLtPyVc1uzwBnAyS3I6YEHQghIsUeb4cFGTyXy00Tnm9XavZ');

router.get('/',(req,res,next)=>{
    const sessionId = req.query.session_id;
    const customerorderid = req.query.customerorderid;
    const now = new Date();
     const dated = strftime('%Y-%m-%d %H:%M:%S', now); 
    stripe.checkout.sessions.retrieve(
        sessionId,
        function(err, session) {
          // Handle any errors
          if (err) {
            console.log(err);
            return;
          }
          var status=0;
          if(session.payment_status=="paid"){
            status=1;
          }
          else{
              status=2;
          }
          connection.query(`UPDATE PaymentDetails SET PaymentDate='${dated}',PaymentStatusId=${status}`,(err,result)=>{
              if (err) throw err;
              else{
                  console.log("inserted");
                  res.redirect('http://localhost:3001/success');
              }
          })
        }
      );
})
module.exports = router;