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

  const [addNoteModal, setModalDisplay] = useState(false);
  const [editNoteModal, setEditModalDisplay] = useState(false);
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);

  const [newStatus, setNewStatus] = useState("");
  const [noteToEdit, setNoteToEdit] = useState({ noteKey: 0, noteText: "" });

  useEffect(() => {
    if (game) {
      const keysArray = Object.keys(game);
      if (keysArray.includes("note")) {
        const notesKeysArray = Object.keys(game.note);

        notesKeysArray;

        setNoteKeys(notesKeysArray);
        setNoteCount(notesKeysArray.length + 1);
      } else setNoteCount(1);
    }
  }, [game]);

  useEffect(() => {
    document.body.style.overflow =
      addNoteModal || editNoteModal ? "hidden" : "unset";
  }, [addNoteModal, editNoteModal]);

  function handleGameNote(input) {
    setGameNote(input);
  }

  function handleNoteAdd() {
    const updatedNotes = {
      ...game.note,
      [noteCount]: gameNote,
    };

    patchData("addnote", params.id, updatedNotes);
    window.location.reload();
  }

  function handleNoteEdit() {
    const updatedNotes = {
      ...game.note,
      [noteToEdit.noteKey]: noteToEdit.noteText,
    };

    patchData("editnote", params.id, updatedNotes);
    window.location.reload();
  }

  function handleStatusChange() {
    const updatedStatus = {
      status: newStatus,
    };
    patchData("editstatus", params.id, updatedStatus);
  }

  return (
    loaded && (
      <>
        <Modal
          modalClassName={
            addNoteModal ? "statusEditModalOn" : "statusEditModalOff"
          }
          modalContent={
            <div
              className={
                addNoteModal ? "newStatusModalOn" : "newStatusModalOff"
              }
            >
              <p>Select new game status</p>
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
              <div className="newStatusButtons">
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
                    setModalDisplay(!addNoteModal);
                  }}
                >
                  Cancel
                </button>
              </div>
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
                    setModalDisplay(!addNoteModal);
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
            <Modal
              modalClassName={
                editNoteModal ? "noteEditModalOn" : "noteEditModalOff"
              }
              modalContent={
                <div className="noteEditConfirmationOn">
                  <p>Enter new note text</p>
                  <textarea
                    defaultValue={noteToEdit.noteText}
                    onChange={(event) => {
                      {
                        setNoteToEdit({
                          noteKey: noteToEdit.noteKey,
                          noteText: event.target.value,
                        });
                      }
                    }}
                  ></textarea>
                  <div className="noteEditButtons">
                    <button
                      onClick={() => {
                        handleNoteEdit();
                      }}
                    >
                      Confirm
                    </button>
                    <button onClick={() => setEditModalDisplay(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              }
            />
            <Modal
              modalClassName={
                deleteNoteModal ? "deleteNoteModalOn" : "deleteNoteModalOff"
              }
              modalContent={
                <div className="deleteNoteConfirmOn">
                  <p>Are you sure you want to delete this note?</p>
                  <div className="noteDeleteConfirmationButtons">
                    <button
                      onClick={() => {
                        handleNoteEdit();
                      }}
                    >
                      Confirm
                    </button>
                    <button onClick={() => setDeleteNoteModal(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              }
            />
            {notesKeys.map((index) => {
              if (game.note[index].length > 0) {
                return (
                  <div key={index} className="gameNote">
                    <p>{game.note[index]}</p>
                    <div className="notesButtons">
                      <button
                        onClick={() => {
                          setNoteToEdit({
                            noteKey: index,
                            noteText: game.note[index],
                          });
                          setEditModalDisplay(!editNoteModal);
                        }}
                      >
                        Edit note
                      </button>
                      <button
                        onClick={() => {
                          setNoteToEdit({
                            noteKey: index,
                            noteText: "",
                          });
                          setDeleteNoteModal(!deleteNoteModal);
                        }}
                      >
                        Delete note
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </>
    )
  );
}
