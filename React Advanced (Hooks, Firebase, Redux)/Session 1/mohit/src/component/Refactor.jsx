const UserContext = createContext();

function LikeButton() {
  const user = useContext(UserContext);
  return <button>Like by {user.name}</button>;
}

function Post() {
  return (
    <div>
      <h3>Post Content</h3>
      <LikeButton />
    </div>
  );
}

function Feed() {
  return (
    <div>
      <h2>Feed</h2>
      <Post />
    </div>
  );
}
