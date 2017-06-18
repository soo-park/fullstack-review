var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var httpHelper = require('./httpHelper.js');
// var model = require('../database/index.js');
// var data = require('../data.json')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));
  var port = 1128;
  app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

app.get('/repos', function (req, res) {

  // get data from database


  // options for the ajax request
  var options = {
    url: `https://api.github.com/users/${term}/repos`,
    headers: {
      'Authorization': `Basic ${key}`,
      'User-Agent': 'anything'
    },
    type: "GET",
    dataType: 'text'
  };

  request(options, function() {

  })

  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted:\n' + req.params);
  res.end(JSON.stringify(req.params, null, 2));
});

app.post('/repos/import', function (req, res) {

  // used body parser instead of chunking
  var term = req.body.name;

  httpHelper.githubRequest(term)
  .then((body) => {
    httpHelper.saveToDatabase(body);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(body)
  })
  .catch((err) => {
    console.log(err);
  })
});

// request without promise
  // request(options, function(err, responseFromGithub, body) {
  //   if (err) {
  //     console.log(err);
  //   } else {
      
  //     res.setHeader('Content-Type', 'application/json');
  //     res.send(body, 200);
  //   }
  // })








