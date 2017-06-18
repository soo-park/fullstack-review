var request = require('request');
var model = require('../database/index.js');


module.exports.githubRequest = (term) => {
  console.log("I am githubRequest");

  return new Promise((resolve , reject) => {

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
        reject(err);
      } else {
        // res.setHeader('Content-Type', 'application/json');
        // res.send(body, 200);
        resolve(body);
      }
    })
  });
};

module.exports.saveToDatabase = (body) => {

  // slice it to make a new array
  var repos = JSON.parse(body);

  repos = repos.map(repo => {
    var item = {
      id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      forks: repo.forks,
      watchers: repo.watchers,
      open_issues: repo.open_issues,
      default_branch: repo.default_branch,
      followers_url: repo.owner.followers_url,
      following_url: repo.owner.following_url
    };

    var aRecord = new model.Repo(item);
    // return aRecord;

    return new Promise((resolve, reject) => {
      aRecord.save(function(err) {
        if (err) {
          reject(err);
        } else {
          resolve('Saved');
        }
      });
    })
  });

  console.log(repos);

  Promise.all(repos)
  .then((arrOfPromiseResults) => { console.log('Records saved.'); })
  .catch((err) => { console.log('Error saving data to DB: ', err); });

};


// get helper to find 25 default data from db
// return promise

