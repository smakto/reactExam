import { useData } from "../hooks/useData";

export function GamePage() {
  return (
    <div className="gameCardsContainer">
      <GameCard />
    </div>
  );
}

function GameCard() {
  const { dataSet } = useData("games");

  console.log(dataSet);

  return dataSet.map((game) => {
    return (
      <div key={game._id} className="gameCard">
        <h2>
          {game.name} ({game.releaseDate})
        </h2>
        <h3>{game.genre}</h3>
        <h3>{game.status}</h3>
        <h3>
          {`${game.platform.PC ? "PC" : ""} 
          ${game.platform.Playstation ? "Playstation" : ""} 
          ${game.platform.Xbox ? "Xbox" : ""}`}
        </h3>
        <button
          onClick={() => {
            console.log(game._id);
          }}
        >
          <i className="fa-solid fa-trash fa-2xl"></i>
        </button>
      </div>
    );
  });
}
