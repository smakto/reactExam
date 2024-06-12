import { useData } from "../hooks/useData";
import "../styles/gameCards.css";

export function GamePage() {
  const { dataSet, deleteData } = useData("games");

  return (
    <div className="gameCardsContainer">
      <GameCard data={dataSet} dataDel={deleteData} />
    </div>
  );
}

function GameCard({ data, dataDel }) {
  return data.map((game) => {
    return (
      <div key={game._id} className="gameCard">
        <div className="cardImg">
          <img src={game.img} alt="gameLogo" />
        </div>

        <h2>
          {game.name} ({game.releaseDate})
        </h2>
        <h4>Genre: {game.genre}</h4>
        <h4>Status: {game.status}</h4>

        <div className="platformIcons">
          {game.platform.Playstation ? (
            <i className="fa-brands fa-playstation fa-xl"></i>
          ) : (
            ""
          )}
          {game.platform.Xbox ? (
            <i className="fa-brands fa-xbox fa-xl"></i>
          ) : (
            ""
          )}
          {game.platform.PC ? (
            <i className="fa-solid fa-computer fa-xl"></i>
          ) : (
            ""
          )}
        </div>

        <div className="gameCardButtonContainer">
          <button
            onClick={() => {
              dataDel(game._id);
              window.location.reload();
            }}
          >
            <i className="fa-solid fa-trash fa-xl"></i>
          </button>
        </div>
      </div>
    );
  });
}
