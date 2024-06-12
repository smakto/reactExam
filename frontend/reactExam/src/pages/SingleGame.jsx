import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { Platforms } from "../components/Platforms";
import "../styles/singleGamePage.css";
import { useCallback, useEffect, useState } from "react";

export function SingleGamePage() {
  const params = useParams();
  const { dataSet, loaded, patchData } = useData(`games/${params.id}`);

  const game = dataSet[0];

  const [gameNote, setGameNote] = useState("");

  const [noteCount, setNoteCount] = useState(1);

  useEffect(() => {
    if (game) {
      const keysArray = Object.keys(game);
      if (keysArray.includes("note")) {
        const notesKeys = Object.keys(game.note);
        // console.log(notesKeys.length + 1);
        setNoteCount(notesKeys.length + 1);
      } else setNoteCount(1);
    }
  }, [game]);

  console.log("Notecount", noteCount);
  console.log(game);
  //   console.log(gameNote);

  console.log(game);

  function handleGameNote(input) {
    setGameNote(input);
  }

  function handleNoteAdd() {
    const updatedNotes = {
      ...game.note,
      [noteCount]: gameNote,
    };

    patchData("editnote", params.id, updatedNotes);
    window.location.reload();
  }

  return (
    loaded && (
      <div className="singleGameDiv">
        <div className="singleGameLeft">
          <h1>{game.name}</h1>
          <div className="singleGameInfo">
            <h4>Released: {game.releaseDate}</h4>
            <h4>Genre: {game.genre}</h4>
            <h4>Multiplayer: {game.multiplayer}</h4>
            <h4>Personal game status: {game.status}</h4>
            <h4>
              Available on:
              {
                <Platforms
                  source={game}
                  containerClasses={"platformIcons singleGamePlatforms"}
                />
              }
            </h4>
          </div>
          <div className="noteInputContainer">
            <label htmlFor="gameNotesArea">
              <h4>New note:</h4>
            </label>{" "}
            <textarea
              name="gameNotesArea"
              className="gameNotesArea"
              onChange={(event) => {
                handleGameNote(event.target.value);
              }}
            />
            <button
              onClick={() => {
                handleNoteAdd();
              }}
            >
              Add note
            </button>
          </div>
        </div>
        <div className="singleGameRight">
          <img src={game.img} />
        </div>
      </div>
    )
  );
}
