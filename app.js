NODE_MODULES_CACHE=false;
var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    User=require("./user.js"),
    Hacks=require("./hacks.js"),
    sg = require('sendgrid')(process.env.SENDGRID_API_KEY),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    cookieParser=require("cookie-parser");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/bb");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require("express-session")({
    secret:"Hack is Us",
    resave:false,
    saveUninitialized:false
 }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));
//console.log(User);
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


app.get('/', function(req, res) {
    res.render('home.ejs')
});


app.get("/create",function(req,res) {
    res.render("create.ejs",{b:"2"});
});

app.get("/login",function(req,res){
    res.render("login.ejs", {a: "0"});
});



app.post("/loginned",function (req,res) {
    var user=req.body.username;
    var pass=req.body.password;
    User.findOne({username:user, password:pass,confirmation:"1"},function(err,bb){

        if (!bb) {
            res.render("login.ejs",{a:"1"});
            // alert("Invalid username or password");
        }
        else {
            req.session.username=user;
            res.render("account.ejs", {username:bb.username});
        }
    })
});


app.post("/registered",function(req,res)
{
    var details={

        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        favourite1:req.body.choice1,
        favourite2:req.body.choice2,
        favourite3:req.body.choice3,
        confirmation:"1"

    };
    User.findOne({username:details.username},function(err,bb){
        if(!bb){
            User.findOne({email:details.email},function(err,bb){
                if(!bb) {
                    var request = sg.emptyRequest({
                        method: 'POST',
                        path: '/v3/mail/send',
                        body: {
                            personalizations: [
                                {
                                    to: [
                                        {
                                            email: details.email
                                        }
                                    ],
                                    subject: 'Registered ✔'
                                }
                            ],
                            from: {
                                name:'Banke Bihari Fashions',
                                email: 'Banke Bihari Fashions <iec2016039@iiita.ac.in>'
                            },
                            content: [
                                {
                                    type: 'text/html',
                                    value: '<html><body>' +
                                    "<img src='https://res.cloudinary.com/agbilotia1998/image/upload/v1489771176/BankeBihari-page-001_mgkegs.jpg'><br><br>"+
                                    '<b> Thanks for registering At Banke Bihari Fashions.... <br><br></b>' +
                                    'Proceed and shop at the Clothing Store..<br><br>'+
                                    ' So what are you waiting for , <br>' +

                                    "<a href='https://bankebiharifashions.herokuapp.com/confirmation/username/" + details.username + "' target='_blank'> 'Click on the link to activate your account'</a><br>"+
                                    //"<a href='http:///localhost:3000/confirmation/username/" + > CLICK</a>"+

                                    '<br><i>HAPPY SHOPPING<br> <br></i>'+
                                    '<b>FOR FURTHER QUERIES:<br></b>'+'Contact:<br>Ayush Gupta(07705894165)'+// html body
                                    '</body></html>'
                                }
                            ]
                        }
                    });

                    sg.API(request, function(error, response) {
                        if (error) {
                             console.log('Error response received');
                        //     var hackdata={name:'Tech.',
                        // //                   hacks:{title:'Honey',
                        // //                          body:'Honey is an add-on extension to your chrome browser to instantly begin saving money. It automatically applies coupon codes during checkout',
                        // //                          upvotes:0,
                        // //                          downvotes:0}
                        // //     };
                           //  User.create(details);
                        // //     Hacks.create(hackdata);
                             //res.render("registered.ejs", {username: details.username});
                          }
                        else {
                            User.create(details);
                            res.render("registered.ejs", {username: details.username});
                        }
                        console.log(response.statusCode);
                        console.log(response.body);
                        console.log(response.headers);
                    });
                }
                else{
                    res.render("create.ejs",{b:"0"});
                }
            })
        }
        else{
            res.render("create.ejs",{b:"1"});
        }
    });

});


app.get("/confirmation/username/:un",function(req,res){
    var verify=(req.params.un);
    User.findOne({username:(req.params.un)},function(err,bb){
        if(bb) {
            // newacc.findOne({username:(req.params.un)},bb.confirmation="1");
            User.update({username:verify},{$set:{confirmation:"1"}},function (err, numUpdated) {
                if (err) {
                    console.log(err);
                } else if (numUpdated) {
                    console.log('Confirmation set to 1');
                } else {
                    console.log('No document found with defined "find" criteria!');
                }
                //Close connection
            });
            res.redirect("/login");
        }
        else{
            res.send("USER NOT REGISTERED");
        }
        //console.log(newacc.confirmation);
    })
});


app.get("/:category/hacksdata",function(req,res){
    var category=req.params.category;
    Hacks.find({name:category},function(err,data){
        //console.log(data);
        var dataObj = [];
        for(var i = 0; i < data.length; i++) {
            dataObj.push(data[i].hacks);
        }
        res.status(200).send(JSON.stringify(dataObj));
            if(err){
                res.JSON({error: "Updated Successfully", status: 404});
            }
    });
});

app.get("/feed",function(req, res){
   res.render("feed.ejs");
});

app.get("/logout",function (req,res) {
    req.logout();
    req.session.username=false;
    res.redirect("/");
});


app.listen(process.env.PORT || 5000, function() {
    console.log('Server started');
});