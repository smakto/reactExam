import { useData } from "../hooks/useData";
import { GameCard } from "../components/GameCard";
import { PageHead } from "../components/PageHead";
import "../styles/gameCards.css";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../contexts/useContext";

export function MainPage({ route }) {
  const { dataSet, deleteData, loaded } = useData(route);
  const myContext = useGeneralContext();

  const [dataToRender, setDataToRender] = useState("");

  // console.log(dataToRender);

  useEffect(() => {
    loaded && setDataToRender(dataSet);
  }, [loaded, dataSet]);

  console.log(dataSet);

  useEffect(() => {
    if (myContext.wishlist) {
      setDataToRender(dataSet.filter((game) => game.status === "Wishlist"));
    } else if (myContext.completed) {
      setDataToRender(dataSet.filter((game) => game.status === "Done"));
    } else if (myContext.playing) {
      setDataToRender(dataSet.filter((game) => game.status === "In-progress"));
    } else if (myContext.allgames) {
      setDataToRender(dataSet);
    }
  }, [myContext]);

  return (
    <>
      <PageHead />
      <div className="gameCardsContainer">
        <GameCard data={dataToRender} dataDel={deleteData} />
      </div>
    </>
  );
}
