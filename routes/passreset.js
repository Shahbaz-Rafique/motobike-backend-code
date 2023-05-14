const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {User}=require('./classes');
const crypto = require('crypto');
var {transporter}=require('../nodemailer/mailer');

function generateRandomPassword() {
  const characters = '0123456789';
  let password = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

function sha256(text) {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex');
}

router.post('/',(req,res,next)=>{
    var email=req.body.emails; 
    var verifycode=generateRandomPassword();
        let mailOptions = {
          from: `MotoBike Team <${email}>`,
          to: email,
          subject: "Reset Your Password! Here is Verification Code",
          html: `<p>Your Email verification Code is ${verifycode}</p>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
                return res.redirect('http://localhost:3001/register?sent=false');
            }
            else{
                res.redirect(`http://localhost:3001/forgot-password/verification?sent=${sha256(verifycode)}&email=${email}`); 
            }
        });
  })
  module.exports = router;


