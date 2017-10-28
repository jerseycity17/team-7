// import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

// generate path from computer to folder
let publicPath = path.resolve(__dirname, "public");
let srcPath = path.resolve(__dirname);

// create app using express module
const app = express();
console.log('Creating express app...');

let article = [{Title: "Testing", Author: "Joseph Young",  Description: "This is the description"},
    {Title: "Testing", Author: "Joseph Young",  Description: "This is the description"}]
let searchResults = [];
// declare path, set up handlebards, use bodyparser to decode, and remove headers
app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended:false}));
app.disable('x-powered-by');
var mysql = require('mysql');
var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'rootroot',
        database : 'ISHAR'
}); 

connection.connect();
connection.query("SELECT * FROM Meditation WHERE MATCH(title, author, abstract, manualTags, autoTags) AGAINST('Back Pain' IN NATURAL LANGUAGE MODE)", function(error, results, fields){
	if(error) throw error;
	console.log('Query Results: ' + results);
});

function querySearch(word){
   var query = 'SELECT * FROM Meditation WHERE MATCH(title, author, abstract, manualTags, autoTags) AGAINST("' + word + '" IN NATURAL LANGUAGE MODE)';
    connection.query("SELECT * FROM Meditation WHERE MATCH(title, author, abstract, manualTags, autoTags) AGAINST('Back Pain' IN NATURAL LANGUAGE MODE)", function(error, results, fields) {
    if (error) throw error;
    // JSON parsed file
    console.log(results);
    return results;
});}

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
    res.render('home', {article: article});

});

app.post('/', function(req, res) {

    console.log(req.query);
    if(req.query["title"] !== ""){
        let title = req.query["title"];
        let author = req.query["author"];
        let pubYear = req.query["pubYear"];
        searchResults = querySearch(title);
    }
    if(req.query["general"] !== ""){
        let general = req.query["general"];
        searchResults = querySearch(general);
    }
    console.log(searchResults);
    res.redirect('/AdvancedSearch');
});

app.get('/AdvancedSearch', function(req, res) {
    res.render('AdvancedSearch', {searchResults: searchResults});
    searchResults = [];
});

app.post('/AdvancedSearch', function(req, res) {
    console.log(req.query);
    if(req.query["title"] !== ""){
        let title = req.query["title"];
        let author = req.query["author"];
        let pubYear = req.query["pubYear"];
        searchResults = querySearch(title);
    }
    if(req.query["general"] !== ""){
        let general = req.query["general"];
        searchResults = querySearch(general);
    }
    console.log(searchResults);

    res.redirect('/AdvancedSearch');

});

app.get('/IntHealth', function(req, res) {
    res.render('IntHealth');

});

app.post('/IntHealth', function(req, res) {
    if(req.query.hasOwnProperty("general")){
        let general = req.query["general"];
    }

});

app.get('/About', function(req, res) {
    res.render('About');

});

app.get('/Login', function(req, res) {
    res.render('loginpage');

});

app.get('/Contact', function(req, res) {
    res.render('Contact');

});

app.get('/Journal', function(req, res) {
    res.render('journal');

});





app.listen(3000);
