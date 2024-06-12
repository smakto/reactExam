import { useData } from "../hooks/useData";
import { GameCard } from "../components/GameCard";
import "../styles/gameCards.css";

export function MainPage() {
  const { dataSet, deleteData } = useData("games");

  return (
    <div className="gameCardsContainer">
      <GameCard data={dataSet} dataDel={deleteData} />
    </div>
  );
}
