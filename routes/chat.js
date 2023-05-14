const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {User}=require('./classes');

router.post('/',(req,res,next)=>{
    var chatname=req.body.username;
    var message=req.body.message;
    const now = new Date();
    var data={
        chatuser:chatname,
        message:message,
        Time:now,
    }
      connection.query('INSERT INTO Chat SET ?', data, (err, result) => {
        if (err) throw err;
        console.log('Data inserted successfully!');
        console.log(result);
      });
  })
  module.exports = router;


