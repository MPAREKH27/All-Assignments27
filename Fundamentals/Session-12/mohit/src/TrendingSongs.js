import { useState, useEffect } from 'react';

function TrendingSongs() {
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) throw new Error('Bad response');
        const data = await res.json();
        setTitles(data.slice(0, 3).map(post => post.title));
        setError(false);
      } catch (err) {
        setError(true);
      }
    }
    loadData();
  }, []);

  if (error) return <p>Error loading data</p>;

  return (
    <ul>
      {titles.map((title, i) => (
        <li key={i}>{title}</li>
      ))}
    </ul>
  );
}

export default TrendingSongs;