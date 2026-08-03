import { useTheme } from "./ThemeContext";

function PostHeader() {
  const { theme } = useTheme();
  const text = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <div className={`flex items-center gap-3 mb-3`}>
      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
        S
      </div>
      <div>
        <h3 className={`${text} font-semibold text-sm`}>sakshi_derasari</h3>
        <p className={`${text} text-xs opacity-50`}>2 hours ago</p>
      </div>
    </div>
  );
}

function PostBody({ image, caption }) {
  const { theme } = useTheme();
  const text = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <div>
      <img
        src={image}
        alt={caption}
        className="w-full h-64 object-cover rounded-xl mb-3"
      />
      <PostText caption={caption} />
    </div>
  );
}

function PostText({ caption }) {
  const { theme } = useTheme();
  const text = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return <p className={`${text} text-sm`}>{caption}</p>;
}

function PostFooter() {
  const { theme } = useTheme();
  const text = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <div className={`flex gap-4 mt-3 ${text} text-sm`}>
      <span>❤ 248</span>
      <span>💬 32</span>
      <span>↗ Share</span>
    </div>
  );
}

function PostCard({ image, caption }) {
  const { theme } = useTheme();
  const bg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`${bg} ${border} border rounded-2xl p-4 shadow-2xl w-full max-w-md`}>
      <PostHeader />
      <PostBody image={image} caption={caption} />
      <PostFooter />
    </div>
  );
}

export default PostCard;