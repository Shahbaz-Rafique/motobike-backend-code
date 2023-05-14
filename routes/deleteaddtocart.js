const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.get('/',(req,res,next)=>{
var id=req.query.id;
console.log(id);
var query=`DELETE FROM CustomerAddtoCart Where AddtoCartId=${id}`;
connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Failed to execute the query:', error);
      return;
    }
    else{
        var query=`DELETE FROM AddtoCart Where Id=${id}`;
        connection.query(query, (error, results, fields) => {
            if (error) {
              console.error('Failed to execute the query:', error);
              return;
            }
            else{
                res.send('delete');
            }
          });
    }
  });
})
module.exports = router;