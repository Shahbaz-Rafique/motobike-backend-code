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
    var username=req.body.username; 
    var email=req.body.email; 
    var password=req.body.password;
    var role=3;
    var verifycode=generateRandomPassword();
    const now = new Date();
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now); 
    const dateUpdated = strftime('%Y-%m-%d %H:%M:%S', now); 
    var emailverification="unverified";
    connection.query(`SELECT Id from users where email='${email}'`,(err,result)=>{
      if (err) throw err;
      else if(result.length>=1){
        return res.redirect('http://localhost:3001/register?already=true');
      }
      else{
        let mailOptions = {
          from: `MotoBike Team <${email}>`,
          to: email,
          subject: "Welcome to MotoBike - Confirm Your Registration",
          html: `<p>Dear ${username}!</p><p>Thank you for registering on our website! We're excited to have you on board and look forward to providing you with the best possible experience.</p><p>Kindly Verify your email by using this verification code ${verifycode}.</p><p><b>Regards:</b></p><p>MOTOBIKE TEAM</p>`,
        };
      const DATA=new User(username,email,password,dateCreated,dateUpdated,role,emailverification);
  
      const data = {
        username: username,
        email: DATA.email,
        password:DATA.password,
        dateCreated : DATA.dateCreated,
        dateUpdated : DATA.dateUpdated,
        role:DATA.role,
        emailverification:DATA.emailverification,
        };
        connection.query('INSERT INTO users SET ?', data, (err, result) => {
          if (err) throw err;
          else{
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.log('Error occurred:', error.message);
                  return res.redirect('http://localhost:3001/register?sent=false');
              }
              else{
                  console.log('Message sent successfully!');
                  console.log('Data inserted successfully!');
                  console.log(result);
                  res.redirect(`http://localhost:3001/verification?sent=${sha256(verifycode)}&email=${email}`); 
              }
          });
          }
        });
      }
    })
  })
  module.exports = router;


