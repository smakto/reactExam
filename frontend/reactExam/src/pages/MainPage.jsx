import { useData } from "../hooks/useData";
import { GameCard } from "../components/GameCard";
import "../styles/gameCards.css";

export function MainPage({ route }) {
  const { dataSet, deleteData } = useData(route);

  return (
    <div className="gameCardsContainer">
      <GameCard data={dataSet} dataDel={deleteData} />
    </div>
  );
}
