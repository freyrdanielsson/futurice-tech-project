import { useState, useEffect } from 'react';

export default function useApi(apiCall, defaultValue, deps = []) {
  const [items, setItems] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newItems = await apiCall();
        setItems(newItems);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };

    fetchData();
  }, deps);

  return { items, loading, error };
}