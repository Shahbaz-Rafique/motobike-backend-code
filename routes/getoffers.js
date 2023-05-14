const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var sellerid=req.query.sellerid;
var query=`SELECT * from Sales WHERE sellerid=${sellerid}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    res.send(results);
  });
})
module.exports = router;