import { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        user: { name: action.name, email: action.email },
      };

    case "LOGOUT":
      return { isLoggedIn: false, user: null };

    case "UPDATE_NAME":
      if (!state.user) return state;
      return {
        ...state,
        user: { ...state.user, name: action.name },
      };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (name, email) =>
    dispatch({ type: "LOGIN", name, email });

  const logout = () => dispatch({ type: "LOGOUT" });

  const updateName = (name) => dispatch({ type: "UPDATE_NAME", name });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}