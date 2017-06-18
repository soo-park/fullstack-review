var express = require('express');
var bodyParser = require('body-parser');
var model = require('../database/index.js');
var seed = require('../database/seed.js');
var app = express();
var request = require('request');
var data = require('../data.json')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));
  var port = 1128;
  app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

app.get('/repos', function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted:\n' + req.params);
  res.end(JSON.stringify(req.params, null, 2));
});

app.post('/repos/import', function (req, res) {

  // used body parser instead of chunking
  var term = req.body.name;
  console.log(term);
  // base 64 encode for the username=key
  var key = 'c29vLXBhcms6ZThlZDNiZTNlN2I5MDA4MTRlNjM0ZDNiYTExODMyMTYyMGY3ZTg5Mg==';

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

  // use request instead of jquery $.ajax in React
  request(options, function(err, responseFromGithub, body) {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(body, 200);
    }
  })
});