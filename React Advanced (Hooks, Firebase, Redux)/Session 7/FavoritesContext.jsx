import { createContext, useReducer, useContext } from "react";

const FavoritesContext = createContext();

const initialState = { favorites: [] };

function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.includes(action.id)) return state;
      return { favorites: [...state.favorites, action.id] };

    case "REMOVE_FAVORITE":
      return {
        favorites: state.favorites.filter((id) => id !== action.id),
      };

    case "CLEAR_ALL":
      return { favorites: [] };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addFavorite = (id) => dispatch({ type: "ADD_FAVORITE", id });
  const removeFavorite = (id) => dispatch({ type: "REMOVE_FAVORITE", id });
  const clearAll = () => dispatch({ type: "CLEAR_ALL" });

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addFavorite,
        removeFavorite,
        clearAll,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}