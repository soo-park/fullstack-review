import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount () {
    // bring data from server that is connected to db
    $.ajax({
      url: "/repos",
      success: (data) => {
        for (let i = 0; i < data.length; i++) {
          this.setState( { repos: this.state.repos.concat([data[i]]) });
        }
      }
    });    
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: "/repos/import",
      type: "POST",
      data: {'name': term },
      success: (data) => {
        for (let i = 0; i < data.length; i++) {
          this.setState( { repos: this.state.repos.concat([data[i]]) });
        }
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

// pass in the ajax call result to be used in DOM for event handling
ReactDOM.render(<App />, document.getElementById('app'));

window.App = App;