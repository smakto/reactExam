import { useGeneralContext } from "../contexts/useContext";

export function useResetButtons() {
  const myContext = useGeneralContext();

  function resetButtons() {
    myContext.dispatch({
      type: "ALLGAMESON",
    });
    myContext.dispatch({
      type: "WISHLISTOFF",
    });
    myContext.dispatch({
      type: "PLAYINGOFF",
    });
    myContext.dispatch({
      type: "COMPLETEDOFF",
    });
  }

  return resetButtons;
}
