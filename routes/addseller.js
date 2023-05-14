const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {Seller}=require('./classes');
const {User}=require('./classes');
var multer=require("multer");
const {storage}=require('../multer/upload')
var upload = multer({ storage });

function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

router.post('/',upload.single("sellerimg"),(req,res,next)=>{
  try{
    connection.beginTransaction();
    var username=req.body.name; 
    var email=req.body.email; 
    var contact=req.body.contact;
    var cnic=req.body.cnic;
    var address=req.body.address;
    var city=req.body.city;
    var state=req.body.state;
    var country=req.body.country;
    var membershipstatus=req.query.status;
    const image = req.file.filename;
    var password=generateRandomPassword();
    const now = new Date();
    var role=2;
    var emailverification="verified";
    const dateCreated = strftime('%Y-%m-%d %H:%M:%S', now); 
    const dateUpdated = strftime('%Y-%m-%d %H:%M:%S', now); 
    const DATA=new Seller(image,username,contact,cnic,address,city,state,country,membershipstatus);
    const selleruser=new User(username,email,password,dateCreated,dateUpdated,role,emailverification);
      const seller={
        username: selleruser.username,
        email: selleruser.email,
        password:selleruser.password,
        dateCreated : selleruser.dateCreated,
        dateUpdated : selleruser.dateUpdated,
        role:selleruser.role,
        emailverification:selleruser.emailverification,
      }
      connection.query('INSERT INTO users SET ?', seller, (err, result) => {
        if (err) throw err;
        else{
          connection.query("Select Max(Id) as Id from users", (error, results, fields) => {
            if (error) {
              console.error('Failed to execute the query:', error);
              return;
            }
            else{
              const data = {
                image: DATA.image,
                userId:parseInt(results[0].Id),
                name: DATA.name,
                contact : DATA.contact,
                cnic : DATA.cnic,
                address:DATA.address,
                city:DATA.city,
                state:DATA.state,
                country:DATA.country,
                membershipstatus:DATA.membershipstatus,
                };
                connection.query('INSERT INTO seller SET ?', data, (err, result) => {
                  if (err) throw err;
                  else{
                    console.log('Data inserted successfully!');
                    connection.commit();
                    if(membershipstatus=="active"){
                      res.redirect("http://localhost:3000/add-seller?register=true");
                    }
                    else if(membershipstatus=="requested"){
                      res.redirect("http://localhost:3001/membership?register=true");
                    }
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


