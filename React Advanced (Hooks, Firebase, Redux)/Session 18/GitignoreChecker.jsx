function GitignoreChecker() {
  const gitignoreEntries = [
    { pattern: "*.local", covers: [".env.local", ".env.development.local", ".env.production.local"] },
    { pattern: ".env", covers: [".env (base file)"] },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-lg">
      <h2 className="text-2xl font-bold text-white mb-1">
        Task 4: .gitignore Check
      </h2>
      <p className="text-gray-400 text-xs mb-4">
        Ensuring API keys are never pushed to GitHub
      </p>

      <div className="bg-gray-900 rounded-xl p-4 mb-3">
        <p className="text-green-400 text-xs font-semibold mb-2">
          ✅ .gitignore already contains:
        </p>
        <pre className="text-gray-300 text-xs font-mono">{"*.local"}</pre>
        <p className="text-gray-400 text-xs mt-2">
          This covers: .env.local, .env.development.local, .env.production.local
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 mb-3">
        <p className="text-yellow-400 text-xs font-semibold mb-2">
          ⚠ Also recommended to add:
        </p>
        <pre className="text-gray-300 text-xs font-mono">
          {`.env
.env.development
.env.production`}
        </pre>
        <p className="text-gray-400 text-xs mt-2">
          Prevents base .env files with defaults from being committed.
        </p>
      </div>

      <div className="bg-gray-700 rounded-xl p-4">
        <p className="text-purple-400 text-xs font-semibold mb-2">
          How to verify on GitHub:
        </p>
        <ol className="text-gray-300 text-xs space-y-1 list-decimal list-inside">
          <li>Push your code to GitHub</li>
          <li>Open your repo → click on any .env* file</li>
          <li>If .gitignore works, the file won't appear in the repo</li>
          <li>Check Settings → Security → no secrets exposed</li>
        </ol>
      </div>
    </div>
  );
}

export default GitignoreChecker;