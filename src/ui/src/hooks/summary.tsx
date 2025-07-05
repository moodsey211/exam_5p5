import { useState, useEffect } from 'react';
import { get } from 'src/requests';

export default function useSummary() {
  const [data, setData] = useState({
    data: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    get('summary').then((result) => {
      setData({
        data: result.data,
        loading: false,
        error: false,
      });
    }).catch((err) => {
      console.error(err);
      setData({
        data: err,
        loading: false,
        error: true,
      });
    });
  }, []);
  return data;
}