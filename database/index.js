var mongoose = require('mongoose');

// generates fetcher db
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('fetcher DB connected');
});

// generate schema
var repoSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  html_url: String,
  forks: Number,
  watchers: Number,
  open_issues: Number,
  default_branch: String,
  followers_url: String,
  following_url: String
});

// compile schema
var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;