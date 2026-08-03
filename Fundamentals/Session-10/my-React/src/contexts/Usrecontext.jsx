import React, { createContext, useState } from "react";

export const UserContext = createContext({
  username: "Rahul Sharma",
  loggedIn: true,
});

export function UserProvider({ children }) {
  const [user, setUser] = useState({ username: "Rahul Sharma", loggedIn: true });

  const toggleLogin = () =>
    setUser((u) => ({ ...u, loggedIn: !u.loggedIn }));

  const switchUser = (username) =>
    setUser((u) => ({ ...u, username }));

  return (
    <UserContext.Provider value={{ ...user, toggleLogin, switchUser }}>
      {children}
    </UserContext.Provider>
  );
}
