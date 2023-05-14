const express = require('express');
var router = express.Router();
const {connection}=require('../database/sql');

router.post('/',(req,res,next)=>{
    var title=req.body.title;
    var percentage=req.body.percentage;
    var startdate=req.query.startDate;
    var enddate=req.query.endDate;
    var id=req.query.id;
    var query=`UPDATE Sales SET title='${title}',salepercentage=${percentage},startDate='${startdate}',endDate='${enddate}' WHERE Id=${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        else{
            console.log("updated");
            res.redirect('http://localhost:3000/view-sales?update=true')
        }
      });
  })
  module.exports = router;


