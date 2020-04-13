import React, { useEffect, useState } from 'react';

import useApi from './hooks/useApi';
import { getMyRepos } from './api';

import './App.scss';

function App() {

  const { error, items, loading } = useApi(getMyRepos, null);

  return (
    <div className="App">

    </div>
  );
}

export default App;
