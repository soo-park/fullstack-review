var mongoose = require('mongoose');

// to use Promise for mongoose
mongoose.Promise = global.Promise;
// generates fetcher db
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('fetcher DB connected');
});

// generate schema
var repoSchema = mongoose.Schema({
  id: {
    type: Number,
    index: true,
    unique: true
  },
  name: String,
  html_url: String,
  forks: Number,
  watchers: Number,
  open_issues: Number,
  default_branch: String,
  followers_url: String,
  following_url: String
});

// // compile schema
// var Repo = mongoose.model('Repo', repoSchema);

// module.exports = Repo;

module.exports.Repo = mongoose.model('Repo', repoSchema);