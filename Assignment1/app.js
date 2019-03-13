var express = require('express');
var app = express();
var port = 3000;
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Make a login, and make a non working add to list page.

//get rid of warning for Mongoose
mongoose.Promise = global.Promise;

//Connect to mongodb using mongoose
mongoose.connect("mongodb://localhost:27017/gameentries", {
    useMongoClient:true}).then(function(){
        console.log("MongoDB Connected")})
        .catch(function(err){console.log(err)});

//Load in entry Model
require('./models/ListEntry');
var Entry = mongoose.model('Entries');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Route to index.html
router.get('/', function(req,res){
    res.sendfile(path.join(__dirname+'/index.html'));
});

app.post('/entrylist', function(req,res){
    res.redirect('/entries.html');
});

app.get('/getListData', function(req,res){
    console.log("request made from fetch");
    Entry.find({}).then(function(entries){
        res.send({
            entries:entries
        });
    });
});

router.get('/entries.html', function(req,res){
    res.sendfile(path.join(__dirname+'/entries.html'));
});

router.get('/topic1', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/topic1.html'));
});

router.get('/topic2', function(req,res) {
    res.sendFile(path.join(__dirname + '/views/topic2.html'));
});

router.get('/signup', function(req,res) {
    res.sendFile(path.join(__dirname + '/views/signup.html'));
});

//Post from form on index.html
app.post('/addtolist', function(req,res){
   console.log(req.body);
   var newEntry = {
       Like: req.body.Like,
       Why: req.body.Why,
       Creator: req.body.Creator
   }
   new Entry(newEntry).save().then(function(entry){
       res.redirect('/')});
});

//routs for paths
app.use(express.static(__dirname+'/views'));
app.use(express.static(path.join(__dirname, '/scripts')));
app.use(express.static(__dirname+'/entries'));
app.use('/', router);
//starts server
app.listen(port, function(){
    console.log("Server is running on port " + port);
});