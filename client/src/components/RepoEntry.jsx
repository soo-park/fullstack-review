import React from 'react';
// import RepoEntry from './RepoEntry.jsx';

const RepoEntry = (props) => (
  <div>
      <h4><a href={props.repo.html_url}>{props.repo.name}</a></h4>
  </div>
)

export default RepoEntry;