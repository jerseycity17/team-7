// import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const SolrNode = require('solr-node');

// generate path from computer to folder
let publicPath = path.resolve(__dirname, "public");
let srcPath = path.resolve(__dirname);

// create connection to Solr database
// var client = new SolrNode({
//     host: '54.84.208.45',
//     port: '8983',
//     core: 'test',
//     protocol: 'http',
//     debugLevel: 'ERROR' // log4js debug level paramter
// });

// create app using express module
const app = express();
console.log('Creating express app...');

// declare path, set up handlebards, use bodyparser to decode, and remove headers
app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended:false}));
app.disable('x-powered-by');


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

app.get('/AdvancedSearch', function(req, res) {
    res.render('AdvancedSearch');

});

app.get('/IntHealth', function(req, res) {
    res.render('IntHealth');

});

app.get('/About', function(req, res) {
    res.render('About');

});

app.get('/Login', function(req, res) {
    res.render('about');

});

app.get('/Contact', function(req, res) {
    res.render('Contact');

});


app.listen(3000);