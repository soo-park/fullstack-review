import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    { props.repos.map((repo, idx) => (
     <RepoEntry repo={repo} key={idx}/>
     ))
    }
  </div>
);

export default RepoList;