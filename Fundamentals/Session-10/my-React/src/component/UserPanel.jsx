// import React, { useContext } from "react";
// import { UserContext } from "../contexts/UserContext";
// import { useTheme } from "../contexts/ThemeContext";

// export default function UserPanel() {
//   const { username, loggedIn, toggleLogin, switchUser } = useContext(UserContext);
//   const { theme } = useTheme();
//   const dark = theme === "dark";

//   const pill = (active) => ({
//     display: "inline-block",
//     padding: "3px 10px",
//     borderRadius: "999px",
//     fontSize: "12px",
//     fontWeight: 500,
//     marginRight: "8px",
//     background: active ? (dark ? "#1e3a5f" : "#eff6ff") : (dark ? "#1f2937" : "#f9fafb"),
//     color: active ? (dark ? "#60a5fa" : "#2563eb") : (dark ? "#9ca3af" : "#6b7280"),
//     border: `1px solid ${
//       active ? (dark ? "#3b5998" : "#bfdbfe") : (dark ? "#374151" : "#e5e7eb")
//     }`,
//   });

//   const btn = {
//     padding: "6px 14px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "12px",
//     marginRight: "8px",
//     border: `1px solid ${dark ? "#4b5563" : "#d1d5db"}`,
//     background: dark ? "#1f2937" : "#f9fafb",
//     color: dark ? "#e8eaf0" : "#374151",
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: "10px" }}>
//         <span style={pill(true)}>username: {username}</span>
//         <span style={pill(loggedIn)}>loggedIn: {String(loggedIn)}</span>
//       </div>
//       <button style={btn} onClick={toggleLogin}>Toggle loggedIn</button>
//       <button style={btn} onClick={() => switchUser("Priya Patel")}>Switch → Priya</button>
//       <button style={btn} onClick={() => switchUser("Rahul Sharma")}>Switch → Rahul</button>
//     </div>
//   );
// }
