import { useState } from "react";

function ControlledLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-1">
        Task 1: Controlled Login (useState)
      </h2>
      <p className="text-gray-400 text-xs mb-4">
        Manual state via useState + onChange
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors"
        >
          Login
        </button>
      </form>

      {submitted && (
        <div className="mt-4 bg-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Submitted values:</p>
          <p className="text-white text-sm">Email: {submitted.email}</p>
          <p className="text-white text-sm">Password: {submitted.password}</p>
        </div>
      )}
    </div>
  );
}

export default ControlledLoginForm;