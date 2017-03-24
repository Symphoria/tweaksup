/**
 * Created by AYUSH on 3/24/2017.
 */

var mongoose = require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');

var UserSchema=new mongoose.Schema({
        username:String,
        password:String,
        email:String,
        favourite1:String,
        favourite2:String,
        favourite3:String,
        confirmation:String
    });

UserSchema.plugin(passportLocalMongoose);
mongoose.model("User",UserSchema);
module.exports=mongoose.model("user",UserSchema);
