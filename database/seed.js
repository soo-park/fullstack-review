var Repo = require('./index.js');

// put items into Repo
var data = require('../data.json')

var insertData = (data) => {
  for (let i = 0; i < data.length; i++) {
    insertOneRecord(data[i]);
  }
};

var insertOneRecord = (data) => {
  var item = { 
    name: data.name,
    html_url: data.html_url,
    forks: data.forks,
    watchers: data.watchers,
    open_issues: data.open_issues,
    default_branch: data.default_branch,
    followers_url: data.owner.followers_url,
    following_url: data.owner.following_url
  };  
  var aRecord = new Repo(item);
  aRecord.save();
}

module.exports = insertData;
