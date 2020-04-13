import React, { useEffect, useState } from 'react';

import { getMyRepos } from './api';

import './App.scss';

function App() {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const repos = await getMyRepos();
        setItems(repos);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [])

  console.log(loading, error, items);
  

  return (
    <div className="App">

    </div>
  );
}

export default App;
