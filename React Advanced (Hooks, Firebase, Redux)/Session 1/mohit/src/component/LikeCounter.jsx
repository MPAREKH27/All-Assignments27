

function LikeCounter() {
  const [likes, setLikes] = useState(0);

  return (
    <div style={{ margin: "20px" }}>
      <p>Likes: {likes}</p>
      <button onClick={() => setLikes(likes + 1)}>Like ❤️</button>
    </div>
  );
}


