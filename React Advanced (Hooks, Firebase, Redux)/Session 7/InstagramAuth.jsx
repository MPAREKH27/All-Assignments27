import { useState } from "react";
import { useAuth } from "./AuthContext";

function InstagramAuth() {
  const { isLoggedIn, user, login, logout, updateName } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Instagram Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 mb-3"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 mb-4"
        />
        <button
          onClick={() => login(name || "Guest", email || "guest@example.com")}
          className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-1">Welcome back!</h2>
      <p className="text-purple-400 font-semibold text-lg mb-1">
        @{user.name}
      </p>
      <p className="text-gray-400 text-xs mb-4">{user.email}</p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New display name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
        />
        <button
          onClick={() => {
            if (newName) {
              updateName(newName);
              setNewName("");
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          Update
        </button>
      </div>

      <button
        onClick={logout}
        className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
}

export default InstagramAuth;