import { createContext, useContext, useReducer } from "react";

const defaultValues = {
  wishlist: 0,
  completed: 0,
  playing: 0,
  allgames: 1,
  gameSearch: "",
  pageHead: "All games",
};

const GeneralContext = createContext();

function reducerActions(state, action) {
  switch (action.type) {
    case "GAMESEARCH":
      return {
        ...state,
        gameSearch: action.gameToFind,
      };
    case "WISHLISTOFF":
      return {
        ...state,
        wishlist: 0,
      };
    case "WISHLISTON":
      return {
        ...state,
        wishlist: 1,
      };
    case "COMPLETEDOFF":
      return {
        ...state,
        completed: 0,
      };
    case "COMPLETEDON":
      return {
        ...state,
        completed: 1,
      };
    case "PLAYINGOFF":
      return {
        ...state,
        playing: 0,
      };
    case "PLAYINGON":
      return {
        ...state,
        playing: 1,
      };
    case "ALLGAMESOFF":
      return {
        ...state,
        allgames: 0,
      };
    case "ALLGAMESON":
      return {
        ...state,
        allgames: 1,
      };
    case "NEWPAGEHEAD":
      return {
        ...state,
        pageHead: action.newPageHead,
      };
    default:
      return state;
  }
}

// case "MAINREF":
//     return {
//       ...state,
//       mainRef: action.newMainRef,
//     };

export function GeneralContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducerActions, defaultValues);

  return (
    <GeneralContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GeneralContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGeneralContext() {
  return useContext(GeneralContext);
}
