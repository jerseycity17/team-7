// colors.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

let publicPath = path.resolve(__dirname, "public");

console.log('Creating express app...');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.disable('x-powered-by');
app.use(express.static(publicPath));
app.set('view engine', 'hbs');

app.use(function(req, res, next) {
    if(req.headers.hasOwnProperty('host')) {
        next();
    }
    else {
        res.status(400);
        res.render('400',{});
    }
});

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path);
    console.log(req.body);
    console.log("_____________________________________");
    next();
});



app.get('/', function(req, res) {
    res.render('home');

});


app.post('/', function(req, res) {

    res.redirect('/');
});


app.listen(3000);