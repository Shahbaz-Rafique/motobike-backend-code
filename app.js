var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require("body-parser");
var cors=require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); 
var registerRouter = require('./routes/register'); 
var addsellerRouter = require('./routes/addseller'); 
var getsellerRouter = require('./routes/getseller'); 
var updatesellerRouter = require('./routes/updateseller'); 
var deleteSellerRouter = require('./routes/deleteseller'); 
var addproductRouter = require('./routes/addproduct'); 
var getproductsRouter = require('./routes/getproducts'); 
var deleteproductRouter = require('./routes/deleteproduct'); 
var updateproductRouter = require('./routes/updateproduct'); 
var getcolorsRouter = require('./routes/getcolors'); 
var getsizesRouter = require('./routes/getsizes'); 
var getcategoriesRouter = require('./routes/getcategories'); 
var getcolorssizesRouter = require('./routes/getColor'); 
var getSizeRouter = require('./routes/getSize'); 
var updatequantityRouter = require('./routes/updatequantity'); 
var addofferRouter = require('./routes/addoffer'); 
var getofferRouter = require('./routes/getoffers'); 
var deletesaleRouter = require('./routes/deleteoffer'); 
var getoffersRouter = require('./routes/getsingleoffers'); 
var updatesaleRouter = require('./routes/updateoffer'); 
var sellerProfileRouter = require('./routes/sellerprofile'); 
var updatesellerprofileRouter = require('./routes/updatesellerprofile'); 
var sendemailRouter = require('./routes/emailsending'); 
var adminRouter = require('./routes/getadmin'); 
var allproductsRouter = require('./routes/getallproducts'); 
var customerproduct = require('./routes/getcustomerproductdata'); 
var adminemailRouter = require('./routes/adminemail'); 
var chatboxRouter = require('./routes/chat'); 
var getchatRouter = require('./routes/getchat'); 
var verifyemailRouter = require('./routes/verifyemail'); 
var getcustomersRouter = require('./routes/getcustomers'); 
var submitreviewRouter = require('./routes/reviews'); 
var getRatingRouter = require('./routes/getrating'); 
var getcustomerratingRouter = require('./routes/getcustomerrating'); 
var getcustomerreviewsRouter = require('./routes/getreviews'); 
var getsellerratingRouter = require('./routes/getsellerrating'); 
var getofferdetailsRouter = require('./routes/getofferdetails'); 
var addshippingRouter = require('./routes/addshipping'); 
var successRouter = require('./routes/success'); 
var customersupportRouter = require('./routes/customersupport'); 
var getcustomerchatRouter = require('./routes/getcustomerchat'); 
var getcustomersnameRouter = require('./routes/getcustomername'); 
var adminprofileRouter = require('./routes/adminprofile'); 
var updateadminprofileRouter = require('./routes/updateadminprofile'); 
var addtocartRouter = require('./routes/addtocart'); 
var getaddtocartRouter = require('./routes/getaddtocart'); 
var deleteaddtocartRouter = require('./routes/deleteaddtocart'); 
var getallordersRouter = require('./routes/getorderdetails'); 
var rejectmemberRouter = require('./routes/rejectmember'); 
var acceptmemberRouter = require('./routes/acceptmember'); 
var getsellerordersRouter = require('./routes/getsellerorders'); 
var customerordersRouter = require('./routes/getcustomerorder'); 
var generatechallanRouter = require('./routes/generatecheckout'); 
var customerprofileRouter = require('./routes/getcustomerprofile'); 
var updatecustomerprofileRouter = require('./routes/updatecustomerprofile'); 
var passresetRouter = require('./routes/passreset'); 
var resetRouter = require('./routes/reset'); 
var productsellingreportRouter = require('./routes/productsellingreport'); 
var sellerratingreportRouter = require('./routes/sellerratingreport');
var productsratingreportRouter = require('./routes/productsratingreport');

var app = express();
var db=require('./database/sql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your own domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/addseller', addsellerRouter);
app.use('/getseller', getsellerRouter);
app.use('/updateseller', updatesellerRouter);
app.use('/deleteseller', deleteSellerRouter);
app.use('/addproduct', addproductRouter);
app.use('/getproducts', getproductsRouter);
app.use('/deleteproduct', deleteproductRouter);
app.use('/updateproduct', updateproductRouter);
app.use('/getcolors', getcolorsRouter);
app.use('/getsizes', getsizesRouter);
app.use('/getcategories', getcategoriesRouter);
app.use('/getcolorssizes', getcolorssizesRouter);
app.use('/getSize', getSizeRouter);
app.use('/updatequantity', updatequantityRouter);
app.use('/addoffer', addofferRouter);
app.use('/getoffer', getofferRouter);
app.use('/getoffers', getoffersRouter);
app.use('/deletesale', deletesaleRouter);
app.use('/updatesale', updatesaleRouter);
app.use('/sellerprofile', sellerProfileRouter);
app.use('/updatesellerprofile', updatesellerprofileRouter);
app.use('/sendemail', sendemailRouter);
app.use('/admin', adminRouter);
app.use('/allproducts', allproductsRouter);
app.use('/productsdata' , customerproduct);
app.use('/adminemail' , adminemailRouter);
app.use('/chatbox' , chatboxRouter);
app.use('/getchat' , getchatRouter);
app.use('/verifyemail' , verifyemailRouter);
app.use('/getcustomers' , getcustomersRouter);
app.use('/submitreview' , submitreviewRouter);
app.use('/getrating' , getRatingRouter);
app.use('/getcustomerrating' , getcustomerratingRouter);
app.use('/getcustomerreviews' , getcustomerreviewsRouter);
app.use('/getsellerrating' , getsellerratingRouter);
app.use('/getofferdetails' , getofferdetailsRouter);
app.use('/addshipping' , addshippingRouter);
app.use('/success' , successRouter);
app.use('/customersupport' , customersupportRouter);
app.use('/getcustomerchat' , getcustomerchatRouter);
app.use('/getcustomersname' , getcustomersnameRouter);
app.use('/adminprofile' , adminprofileRouter);
app.use('/updateadminprofile' , updateadminprofileRouter);
app.use('/addtocart' , addtocartRouter);
app.use('/getaddtocart' , getaddtocartRouter);
app.use('/deleteaddtocart' , deleteaddtocartRouter);
app.use('/getallorders' , getallordersRouter);
app.use('/rejectmember' , rejectmemberRouter);
app.use('/acceptmember' , acceptmemberRouter);
app.use('/getsellerorders' , getsellerordersRouter);
app.use('/customerorders' , customerordersRouter);
app.use('/generatechallan' , generatechallanRouter);
app.use('/customerprofile' , customerprofileRouter);
app.use('/updatecustomerprofile' , updatecustomerprofileRouter);
app.use('/passreset' , passresetRouter);
app.use('/reset' , resetRouter);
app.use('/productsellingreport' , productsellingreportRouter);
app.use('/sellerratingreport' , sellerratingreportRouter);
app.use('/productsratingreport' , productsratingreportRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
