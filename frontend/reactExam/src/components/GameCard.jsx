import { useNavigate } from "react-router-dom";
import { Platforms } from "./Platforms";

export function GameCard({ data, dataDel }) {
  const navigate = useNavigate();

  return data.map((game) => {
    return (
      <div
        key={game._id}
        className="gameCard"
        onClick={() => {
          navigate(`/games/${game._id}`);
        }}
      >
        <div className="cardImg">
          <img src={game.img} alt="gameLogo" />
        </div>

        <h2>
          {game.name} ({game.releaseDate})
        </h2>
        <h4>Genre: {game.genre}</h4>
        <h4>Status: {game.status}</h4>
        <Platforms source={game} containerClasses={"platformIcons"} />
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
