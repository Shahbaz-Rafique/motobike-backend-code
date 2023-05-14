const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const stripe = require('stripe')('sk_test_51Lb0MgLqytPq2KPtYsqH3f4aQIpopsJbMcrAXdbuZOq4DaOihLNLtPyVc1uzwBnAyS3I6YEHQghIsUeb4cFGTyXy00Tnm9XavZ');

router.get('/',(req,res,next)=>{
     var Quantity=req.query.Quantity;
     var product=req.query.productname;
     var OrderId=req.query.orderid;
     var price=req.query.total;
     async function createCheckoutSession() {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'pkr',
                product_data: {
                    name: `${product}`,
                },
                unit_amount: price*100,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `http://localhost:4000/success?session_id={CHECKOUT_SESSION_ID}&customerorderid=${OrderId}`,
          cancel_url: 'http://localhost:3001/cancel',
        });
        return session.url;
      }
      createCheckoutSession()
    .then((url) => res.redirect(url))
    .catch((error) => console.error(error));
    
})
  module.exports = router;


