import { useState, useEffect } from 'react';

function IPLScores() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadScores() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (res.status !== 200) {
          throw new Error(`Unexpected status: ${res.status}`);
        }
        const data = await res.json();
        const dummyScores = data.slice(0, 5).map(user => ({
          team: user.name,
          score: Math.floor(Math.random() * 200) + ' runs'
        }));
        setScores(dummyScores);
        setError(false);
      } catch (err) {
        setError(true);
      }
    }
    loadScores();
  }, []);

  if (error) return <p>Error loading scores</p>;

  return (
    <ul>
      {scores.map((s, i) => (
        <li key={i}>{s.team}: {s.score}</li>
      ))}
    </ul>
  );
}

export default IPLScores;