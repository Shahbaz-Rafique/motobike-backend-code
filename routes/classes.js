class User {
    constructor(username, email,password,dateCreated,dateUpdated,role,emailverification) {
      this.username = getStringBeforeGmail(email);
      this.email = email;
      this.password = password;
      this.dateCreated = dateCreated;
      this.dateUpdated = dateUpdated;
      this.role=role;
      this.emailverification=emailverification;
    }
  }

  class Seller {
    constructor(image, name,contact,cnic,address,city,state,country,membershipstatus) {
      this.image = image;
      this.name = name;
      this.contact = contact;
      this.cnic = cnic;
      this.address=address;
      this.city=city;
      this.state=state;
      this.country=country;
      this.membershipstatus=membershipstatus;
    }
  }

  class Product {
    constructor( name,description,manufacturer,model,categoryid,price,image,availability,dateCreated,dateUpdated) {
      this.name = name;
      this.description = description;
      this.manufacturer = manufacturer;
      this.model=model;
      this.categoryid=categoryid;
      this.price=price;
      this.image=image;
      this.availability=availability;
      this.dateCreated=dateCreated;
      this.dateUpdated=dateUpdated;
    }
  }

  class Offer {
    constructor(title,percentage,startdate,enddate,sellerid) {
      this.title = title;
      this.percentage = percentage;
      this.startdate = startdate;
      this.enddate=enddate;
      this.sellerid=sellerid;
    }
  }

  class Rating{
    constructor(productid,RatingScale) {
      this.productid = productid;
      this.RatingScale = RatingScale;
    }
  }
  class Review{
    constructor(ratingid,reviewtext,dated) {
      this.ratingid = ratingid;
      this.reviewtext = reviewtext;
      this.dated = dated;
    }
  }

  class CustomerReview{
    constructor(customerid,reviewid) {
      this.customerid = customerid;
      this.reviewid = reviewid;
    }
  }

  class CustomerRating{
    constructor(customerid,ratingid) {
      this.customerid = customerid;
      this.ratingid = ratingid;
    }
  }

  class SellerRating{
    constructor(sellerid,ratingid) {
      this.sellerid = sellerid;
      this.ratingid = ratingid;
    }
  }

  class Customer{
    constructor(userid,Image,Name,Contact,Address) {
      this.userid = userid;
      this.Image = Image;
      this.Name = Name;
      this.Contact=Contact;
      this.Address=Address;
    }
  }

  class Shipping{
    constructor(shippingaddress,city,state,country,postcode){
      this.shippingaddress=shippingaddress;
      this.city=city;
      this.state=state;
      this.country=country;
      this.postcode=postcode;
    }
  }

  class CustomerShipping{
    constructor(customerid,shippingid){
      this.customerid=customerid;
      this.shippingid=shippingid;
    }
  }

  class OrderDetails{
    constructor(productid,quantity,productsize,productcolor,totalprice,discount,orderdate){
      this.productid=productid;
      this.quantity=quantity;
      this.productsize=productsize;
      this.productcolor=productcolor;
      this.totalprice=totalprice;
      this.discount=discount;
      this.orderdate=orderdate;
    }
  }

  class CustomerOrder{
    constructor(orderid,customerid){
        this.orderid=orderid;
        this.customerid=customerid;
    } 
  }

  class PaymentDetails{
    constructor(customerorderid,paymentdate,paymentstatusid){
        this.customerorderid=customerorderid;
        this.paymentdate=paymentdate;
        this.paymentstatusid=paymentstatusid;
    } 
  }

  class CustomerSupport{
    constructor(fromid,toid,message,date){
        this.fromid=fromid;
        this.toid=toid;
        this.message=message; 
        this.date=date; 
    } 
  }

  class Addtocart{
    constructor(productid,colorid,sizeid,quantity){
        this.productid=productid;
        this.colorid=colorid;
        this.sizeid=sizeid; 
        this.quantity=quantity; 
    } 
  }

  class CustomerAddtocart{
    constructor(customerid,addtocartid){
        this.customerid=customerid;
        this.addtocartid=addtocartid;
    } 
  }

  function getStringBeforeGmail(email) {
    var index = email.indexOf("@gmail.com");
    if (index == -1) {
      return ""; // If the email doesn't contain "@gmail.com"
    } else {
      return email.substring(0, index);
    }
  }

  module.exports={User,Seller,Product,Offer,Customer,Rating,Review,CustomerReview,CustomerRating,SellerRating,Shipping,CustomerShipping,OrderDetails,CustomerOrder,PaymentDetails,CustomerSupport,Addtocart,CustomerAddtocart};