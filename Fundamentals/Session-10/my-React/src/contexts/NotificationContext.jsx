import React, { createContext, useContext, useState } from "react";

export const NotificationContext = createContext({
  count: 0,
  add: () => {},
  clear: () => {},
});

export function NotificationProvider({ children }) {
  const [count, setCount] = useState(0);

  const add = () => setCount((n) => n + 1);
  const clear = () => setCount(0);

  return (
    <NotificationContext.Provider value={{ count, add, clear }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
