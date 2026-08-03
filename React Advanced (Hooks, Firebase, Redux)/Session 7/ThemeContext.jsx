import { createContext, useReducer, useContext } from "react";

const ThemeContext = createContext();

const initialState = { mode: "light" };

function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { mode: state.mode === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });

  return (
    <ThemeContext.Provider value={{ mode: state.mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}