import { useData } from "../hooks/useData";
import { GameCard } from "../components/GameCard";
import { PageHead } from "../components/PageHead";
import "../styles/gameCards.css";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../contexts/useContext";
import { useSearch } from "../hooks/useSearch";

function searchFunct(element, inputValue) {
  return element.name.toLowerCase().includes(inputValue.toLowerCase());
}

export function MainPage({ route }) {
  const { dataSet, deleteData, loaded } = useData(route);
  const [dataToRender, setDataToRender] = useState([]);
  const myContext = useGeneralContext();

  const [data, handleInput] = useSearch(dataToRender, searchFunct);

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
      <div className="gameCardsContainer">
        <GameCard data={data} dataDel={deleteData} />
      </div>
    </>
  );
}
