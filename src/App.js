import React from 'react';

import useApi from './hooks/useApi';
import { getMyRepos } from './api';

import RepoContainer from './components/RepoContainer/RepoContainer';

import './App.scss';

function App() {

  const { error, items, loading } = useApi(getMyRepos, null);

  return (
    <div className="app">
      {error && <div>Oh no error!</div>}
      {loading && <div>Loading repositories</div>}

      {items &&
        <div className='repositories'>
          {items.map(repo => {
            return (
              <RepoContainer key={repo.id} repo={repo} />
            );
          })}
        </div>
      }
    </div>
  );
}

export default App;
