var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var httpHelper = require('./httpHelper.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

var port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


app.get('/repos', function (req, res) {

  console.log(httpHelper.getDataFromDatabase());
  httpHelper.getDataFromDatabase()
  .then((docs) => {
    res.send(docs);
    res.end();
  })
  .catch((err) => {
    console.log(err);
  });
});


app.post('/repos/import', function (req, res) {
  // used body parser instead of chunking
  var term = req.body.name;

  httpHelper.githubRequest(term)
  .then((body) => {
    httpHelper.saveToDatabase(body);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(body);
    res.end();
  })
  .catch((err) => {
    console.log(err);
  });

});


// request without promise
  // options for the ajax request
  // var options = {
  //   url: `https://api.github.com/users/${term}/repos`,
  //   headers: {
  //     'Authorization': `Basic ${key}`,
  //     'User-Agent': 'anything'
  //   },
  //   type: "POST",
  //   dataType: 'text'
  // };

  // request(options, function(err, responseFromGithub, body) {
  //   if (err) {
  //     console.log(err);
  //   } else {
      
  //     res.setHeader('Content-Type', 'application/json');
  //     res.send(body, 200);
  //   }
  // })


