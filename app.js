NODE_MODULES_CACHE=false;
var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    sg = require('sendgrid')(process.env.SENDGRID_API_KEY),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose");
    cookieParser=require("cookie-parser");

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('home.ejs')
});

app.listen(process.env.PORT || 5000, function() {
    console.log('server started');
});