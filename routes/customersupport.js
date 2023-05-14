const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');
const strftime = require('strftime');
const {CustomerSupport}=require('./classes');

router.post('/',(req,res,next)=>{
    var fromid=req.body.fromid;
    var toid=req.body.toid;
    var message=req.body.message;
    const now = new Date();
    const dated = strftime('%Y-%m-%d %H:%M:%S', now)
    const chat=new CustomerSupport(fromid,toid,message,dated);
    var data={
        FromId:chat.fromid,
        ToId:chat.toid,
        Message:chat.message,
        Dated:chat.date,
    }
      connection.query('INSERT INTO CustomerSupport SET ?', data, (err, result) => {
        if (err) throw err;
        console.log('Data inserted successfully!');
        console.log(result);
      });
  })
  module.exports = router;


