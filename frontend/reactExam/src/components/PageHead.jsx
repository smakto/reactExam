import { useParams } from "react-router-dom";
import "../styles/pageHead.css";
import { useGeneralContext } from "../contexts/useContext";
import { Input } from "./Inputs";

export function PageHead({ handleSearchInput }) {
  const urlPath = window.location.pathname;
  const myContext = useGeneralContext();

  function handleClick(currentValue, buttonOn, buttonOff) {
    resetButtons();
    myContext.dispatch({
      type: currentValue ? buttonOff : buttonOn,
    });
  }

  function resetButtons() {
    myContext.dispatch({
      type: "WISHLISTOFF",
    });
    myContext.dispatch({
      type: "COMPLETEDOFF",
    });
    myContext.dispatch({
      type: "PLAYINGOFF",
    });
    myContext.dispatch({
      type: "ALLGAMESOFF",
    });
  }

  // function handleChange(inputData) {
  //   myContext.dispatch({
  //     type: "GAMESEARCH",
  //     gameToFind: inputData,
  //   });
  // }

  return (
    <div className="pageHeadContainer">
      <div className="pageHeadLeft">
        <h2 className="gameCategoryHead">
          {urlPath === ("/games" || "/games/")
            ? "All games"
            : urlPath === ("/psgames" || "/psgames/")
            ? "Playstation games"
            : urlPath === ("/xboxgames" || "/xboxgames/")
            ? "Xbox games"
            : urlPath === ("/pcgames" || "/pcgames/") && "PC games"}
        </h2>
        <ToggleButtons
          buttonText={"Currently playing"}
          handleClick={handleClick}
          currentValue={myContext.playing}
          buttonOn="PLAYINGON"
          buttonOff="PLAYINGOFF"
          buttonClass={myContext.playing ? "buttonOn" : "buttonOff"}
        />
        <ToggleButtons
          buttonText={"Wishlist"}
          handleClick={handleClick}
          currentValue={myContext.wishlist}
          buttonOn="WISHLISTON"
          buttonOff="WISHLISTOFF"
          buttonClass={myContext.wishlist ? "buttonOn" : "buttonOff"}
        />
        <ToggleButtons
          buttonText={"Completed"}
          handleClick={handleClick}
          currentValue={myContext.completed}
          buttonOn="COMPLETEDON"
          buttonOff="COMPLETEDOFF"
          buttonClass={myContext.completed ? "buttonOn" : "buttonOff"}
        />
        <ToggleButtons
          buttonText={"All games"}
          handleClick={handleClick}
          currentValue={myContext.allgames}
          buttonOn="ALLGAMESON"
          buttonOff="ALLGAMESOFF"
          buttonClass={`allGamesButton ${
            myContext.allgames ? "buttonOn" : "buttonOff"
          }`}
        />
      </div>
      <div className="pageHeadRight">
        <label htmlFor="searchInput">Search game name</label>
        <input
          type="text"
          name="searchInput"
          onChange={handleSearchInput}
        ></input>
      </div>
    </div>
  );
}

function ToggleButtons({
  buttonText,
  handleClick,
  buttonClass,
  currentValue,
  buttonOn,
  buttonOff,
}) {
  return (
    <>
      <button
        className={buttonClass}
        onClick={() => {
          handleClick(currentValue, buttonOn, buttonOff);
        }}
      >
        {buttonText}
      </button>
    </>
  );
}
