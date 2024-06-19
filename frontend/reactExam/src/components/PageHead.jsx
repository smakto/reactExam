import "../styles/pageHead.css";
import { useGeneralContext } from "../contexts/useContext";

export function PageHead({ handleSearchInput }) {
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

  return (
    <div className="pageHeadContainer">
      <PageHeadLeft handleClick={handleClick} />
      <PageHeadRight handleSearchInput={handleSearchInput} />
    </div>
  );
}

function PageHeadLeft({ handleClick }) {
  const myContext = useGeneralContext();

  return (
    <div className="pageHeadLeft">
      <h1 className="gameCategoryHead">{myContext.pageHead}</h1>
      <ToggleButton
        buttonText={"Currently playing"}
        handleClick={handleClick}
        currentValue={myContext.playing}
        buttonOn="PLAYINGON"
        buttonOff="PLAYINGOFF"
        buttonClass={myContext.playing ? "buttonOn" : "buttonOff"}
      />
      <ToggleButton
        buttonText={"Wishlist"}
        handleClick={handleClick}
        currentValue={myContext.wishlist}
        buttonOn="WISHLISTON"
        buttonOff="WISHLISTOFF"
        buttonClass={myContext.wishlist ? "buttonOn" : "buttonOff"}
      />
      <ToggleButton
        buttonText={"Completed"}
        handleClick={handleClick}
        currentValue={myContext.completed}
        buttonOn="COMPLETEDON"
        buttonOff="COMPLETEDOFF"
        buttonClass={myContext.completed ? "buttonOn" : "buttonOff"}
      />
      <ToggleButton
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
  );
}

function PageHeadRight({ handleSearchInput }) {
  return (
    <div className="pageHeadRight">
      <label htmlFor="searchInput">Search game name:</label>
      <input
        type="text"
        name="searchInput"
        onChange={handleSearchInput}
      ></input>
    </div>
  );
}

function ToggleButton({
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
