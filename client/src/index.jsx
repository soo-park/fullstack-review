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

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: "/repos/import",
      type: "POST",
      data: {'name': term },
      success: (data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.setState( { repos: this.state.repos.concat([data[i]]) });

        }
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

// pass in functions & properties to be used in DOM for event handling
ReactDOM.render(<App />, document.getElementById('app'));

window.App = App;