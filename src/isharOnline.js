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
    {Title: "Testing", Author: "Joseph Young",  Description: "This is the description"}];
let searchResults = [];
// declare path, set up handlebards, use bodyparser to decode, mrSQl, and remove headers
app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended:false}));
app.disable('x-powered-by');
var mysql = require('mysql');

// create an object connection to specficied server

var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'rootroot',
        database : 'ISHAR'
}); 

// connect to SQL server
connection.connect();

// query search that can search for title, author, and publish date
// used for both advanced search and scholar search
// Query MySQL database using parameters given in search box
function querySearch(word, author, pub){
    // create queryString to send to SQL database
    var query = "SELECT * FROM AyurMedi WHERE MATCH(title, author, abstract, manualTags, autoTags) AGAINST('"+word+"' IN NATURAL LANGUAGE MODE)";
    if (author !== "") query += " AND AUTHOR = '" + author + "'";
    if (pub !== "") query += " AND publicationYear = '" + pub + "'";
    console.log(query);
    //send query and recieve results
    connection.query(query, function(error, results, fields) {
    if (error) throw error;
    // JSON parsed file
    console.log(results);

    //set global var searchResults to results
    searchResults = results;
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
    // render home page with articles
    res.render('home', {article: article});

});


app.post('/', function(req, res) {
    // redirect to /adancedSearch page when recieving a post request
    res.redirect('/AdvancedSearch');
});

app.get('/AdvancedSearch', function(req, res) {
    // render search results and reset results
    res.render('AdvancedSearch', {searchResults: searchResults});
    searchResults = [];
});

app.post('/AdvancedSearch', function(req, res) {
    // check for info in title/general to decide which search bar was used
    console.log(req.query);
    // set defined variables
    if(req.body.title !== undefined){
        let title = req.body.title;
        let author = req.body.author;
        let pubYear = req.body.pubYear;
	console.log(req.body.title);
	// query search SQL and set global data
	querySearch(req.body.title, req.body.author, req.body.pubYear);
    }
    // set defined variables
    else if(req.body.general !== ""){
	console.log("general is running");
        let general = req.body.general;
	querySearch(req.body.general, "", "");

    }
    console.log("this is searchResults: " + searchResults);
	
    res.redirect('/AdvancedSearch');

});

app.get('/IntHealth', function(req, res) {
    // render IntHealth info from CSS/HTML files with HBS
    res.render('IntHealth');

});

app.get('/About', function(req, res) {
    // render About info from CSS/HTML files with HBS
    res.render('About');

});

app.get('/Login', function(req, res) {
    // render Login page from CSS/HTML files with HBS
    res.render('loginpage');

});

app.get('/Contact', function(req, res) {
    // render Contact info from CSS/HTML files with HBS
    res.render('Contact');

});

app.get('/Journal', function(req, res) {
    // render Journal from CSS/HTML files with HBS
    res.render('journal');

});





app.listen(3000);
