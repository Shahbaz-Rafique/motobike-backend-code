const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
var {transporter}=require('../nodemailer/mailer');

router.post('/',(req,res,next)=>{
    var to=req.body.to;
    var subject=req.body.subject;
    var msg=req.body.message;
    let mailOptions = {
        from: `MotoBike Admin <shahbazrafique101@gmail.com>`,
        to: to,
        subject: subject,
        html: `<p>${msg}</p><p><b>Regards:</b> </p><p>MotoBike Admin</p>`,
      };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
            return res.redirect('http://localhost:3000/admin-emailing-system?send=false');
        }
        else{
            console.log('Message sent successfully!');
            return res.redirect('http://localhost:3000/admin-emailing-system?send=true');
            transporter.close();
            
        }
    });
  })
  module.exports = router;