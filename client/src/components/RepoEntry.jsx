import React from 'react';
// import RepoEntry from './RepoEntry.jsx';

const RepoEntry = (props) => (
  <div>
  {console.log(props)}
      <h4> {props.repo.name} </h4>
  </div>
)

export default RepoEntry;