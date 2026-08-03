import React, { useState } from "react";

// Custom Hook
function useLikeButton(initialCount = 0) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setCount(count - 1);
    } else {
      setLiked(true);
      setCount(count + 1);
    }
  };

  return { liked, count, toggleLike };
}

// Component using the hook
function PostCard({ content }) {
  const { liked, count, toggleLike } = useLikeButton();

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <p>{content}</p>
      <button onClick={toggleLike}>
        {liked ? "💔 Unlike" : "❤️ Like"} ({count})
      </button>
    </div>
  );
}

export default PostCard;
