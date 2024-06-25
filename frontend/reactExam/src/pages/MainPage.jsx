import { useData } from "../hooks/useData";
import { GameCard } from "../components/GameCard";
import { PageHead } from "../components/PageHead";
import "../styles/gameCards.css";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../contexts/useContext";
import { useSearch } from "../hooks/useSearch";
import { PlaceHolderDiv } from "../components/PlaceHolder";
import { useNavigate } from "react-router-dom";
import { useResetButtons } from "../hooks/useResetButtons";

function searchFunct(element, inputValue) {
  return element.name.toLowerCase().includes(inputValue.toLowerCase());
}

export function MainPage() {
  const urlPath = window.location.pathname;
  const queryParameters = new URLSearchParams(window.location.search);
  const limit = queryParameters.get("limit");
  const navigate = useNavigate();
  const resetButtons = useResetButtons();
  const { dataSet, deleteData, loaded } = useData(`${urlPath}?limit=${limit}`);
  const [dataToRender, setDataToRender] = useState([]);
  const myContext = useGeneralContext();

  const [data, handleInput] = useSearch(dataToRender, searchFunct);

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    loaded && setDataToRender(dataSet);
  }, [loaded, dataSet]);

  useEffect(() => {
    if (myContext.wishlist) {
      setDataToRender(dataSet.filter((game) => game.status === "Wishlist"));
    } else if (myContext.completed) {
      setDataToRender(dataSet.filter((game) => game.status === "Done"));
    } else if (myContext.playing) {
      setDataToRender(dataSet.filter((game) => game.status === "In-progress"));
    } else if (myContext.allgames) {
      setDataToRender(dataSet);
    } else if (
      !myContext.wishlist &&
      !myContext.completed &&
      !myContext.playing &&
      !myContext.allgames
    ) {
      myContext.dispatch({
        type: "ALLGAMESON",
      });
    }
  }, [myContext]);

  return (
    <>
      <PageHead handleSearchInput={handleInput} />
      {loaded && dataToRender.length > 0 ? (
        <div className="gameCardsContainer">
          <GameCard data={data} dataDel={deleteData} />
        </div>
      ) : !loaded ? (
        <PlaceHolderDiv
          className={"placeHolderDiv"}
          alertText={"Loading. Please wait."}
        />
      ) : (
        <PlaceHolderDiv
          className={"placeHolderDiv"}
          alertText={"No games in selected category."}
        />
      )}
      <div
        className={showButton ? "showAllButtonContainer" : "showAllButtonOff"}
      >
        <button
          className="showAllButton"
          onClick={() => {
            navigate("/games");
            setShowButton(false);
            resetButtons();
            window.scrollTo(0, 0);
          }}
        >
          Show all
        </button>
      </div>
    </>
  );
}
