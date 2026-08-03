import firebaseConfig from "./firebase";

function EnvDisplay() {
  const envVars = [
    { label: "Spotify API Key", value: import.meta.env.VITE_SPOTIFY_API_KEY },
    { label: "Firebase API Key", value: import.meta.env.VITE_FIREBASE_API_KEY },
    { label: "Welcome Message", value: import.meta.env.VITE_WELCOME_MSG },
    { label: "App Environment", value: import.meta.env.VITE_APP_ENV },
    { label: "Mode", value: import.meta.env.MODE },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-lg">
      <h2 className="text-2xl font-bold text-white mb-1">
        Task 1 & 3: Environment Variables
      </h2>
      <p className="text-gray-400 text-xs mb-4">
        Accessed via import.meta.env.VITE_* (Vite convention)
      </p>

      <div className="space-y-2 mb-4">
        {envVars.map((v) => (
          <div
            key={v.label}
            className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-2"
          >
            <span className="text-gray-400 text-xs">{v.label}</span>
            <span className="text-green-400 text-xs font-mono">
              {v.value || "(not set)"}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-xl p-4">
        <p className="text-gray-400 text-xs mb-2">Firebase Config (from .env):</p>
        <pre className="text-gray-300 text-xs font-mono whitespace-pre-wrap">
          {JSON.stringify(firebaseConfig, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default EnvDisplay;