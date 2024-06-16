import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { Platforms } from "../components/Platforms";
import "../styles/singleGamePage.css";
import "../styles/modal.css";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { Input } from "../components/Inputs";

export function SingleGamePage() {
  const params = useParams();
  const { dataSet, loaded, patchData } = useData(`games/${params.id}`);
  const game = dataSet[0];
  const [gameNote, setGameNote] = useState("");
  const [noteCount, setNoteCount] = useState(1);
  const [notesKeys, setNoteKeys] = useState("");

  const [modalDisplay, setModalDisplay] = useState(false);

  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (game) {
      const keysArray = Object.keys(game);
      if (keysArray.includes("note")) {
        const notesKeysArray = Object.keys(game.note);
        setNoteKeys(notesKeysArray);
        setNoteCount(notesKeysArray.length + 1);
      } else setNoteCount(1);
    }
  }, [game]);

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

  function handleStatusChange() {
    const updatedStatus = {
      status: newStatus,
    };
    patchData("editstatus", params.id, updatedStatus);
    console.log(updatedStatus);
  }

  return (
    loaded && (
      <>
        <Modal
          modalClassName={
            modalDisplay ? "statusEditModalOn" : "statusEditModalOff"
          }
          modalContent={
            <div
              className={
                modalDisplay ? "newStatusModalOn" : "newStatusModalOff"
              }
            >
              <select
                name="newStatusSelect"
                id="newStatusSelect"
                onChange={(event) => {
                  setNewStatus(event.target.value);
                }}
              >
                <option defaultChecked value="Wishlist">
                  Wishlist
                </option>
                <option value="In-progress">In-progress</option>
                <option value="Done">Done</option>
              </select>
              <button
                onClick={() => {
                  handleStatusChange();
                  setModalDisplay(false);
                  window.location.reload();
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setModalDisplay(!modalDisplay);
                }}
              >
                Cancel
              </button>
            </div>
          }
        />
        <div className="singleGameDiv">
          <div className="singleGameLeft">
            <h1>{game.name}</h1>
            <div className="singleGameInfo">
              <h4>Released: {game.releaseDate}</h4>
              <h4>Genre: {game.genre}</h4>
              <h4>Multiplayer: {game.multiplayer}</h4>
              <div className="editStatusContainer">
                <h4>Game status: {game.status}</h4>
                <button
                  className="editStatusButton"
                  onClick={() => {
                    setModalDisplay(!modalDisplay);
                    // console.log(modalDisplay);+++
                  }}
                >
                  Edit status
                </button>
              </div>

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
        {typeof notesKeys !== "string" && (
          <div className="singleGameNotes">
            {" "}
            {notesKeys.map((index) => {
              return (
                <div key={index} className="gameNote">
                  <p>{game.note[index]}</p>
                </div>
              );
            })}
          </div>
        )}
      </>
    )
  );
}
