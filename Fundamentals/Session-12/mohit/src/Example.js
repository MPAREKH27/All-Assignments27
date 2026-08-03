import React, { useEffect, useState } from "react";

function Example() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/invalidurl"
        );

        if (!response.ok) {
          throw new Error("HTTP Error");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Example Component</h2>

      {error ? (
        <p style={{ color: "red" }}>Error loading data</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default Example;