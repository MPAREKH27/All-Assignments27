import { createContext, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const user = { name: "Sakshi", email: "sakshi@example.com" };

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}