import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { Platforms } from "../components/Platforms";
import { useEffect, useState } from "react";
import { SingleGamePageModals } from "../components/Modals";
import "../styles/singleGamePage.css";
import "../styles/modals.css";

export function SingleGamePage() {
  const params = useParams();
  const { dataSet, loaded, patchData } = useData(`/games/${params.id}`);
  const game = dataSet[0];

  const [gameNote, setGameNote] = useState("");
  const [noteCount, setNoteCount] = useState(1);
  const [notesKeys, setNoteKeys] = useState("");
  const [availableNotes, setAvailableNotes] = useState(false);

  const [newStatusModal, setModalDisplay] = useState(false);
  const [editNoteModal, setEditModalDisplay] = useState(false);
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);

  const [newStatus, setNewStatus] = useState("Wishlist");
  const [noteToEdit, setNoteToEdit] = useState({ noteKey: 0, noteText: "" });

  useEffect(() => {
    if (game) {
      const keysArray = Object.keys(game);
      if (keysArray.includes("note")) {
        const notesKeysArray = Object.keys(game.note);
        setNoteKeys(notesKeysArray);
        setNoteCount(notesKeysArray.length + 1);
        if (notesKeysArray) {
          notesKeysArray.forEach((key) => {
            if (game.note[key] !== "") setAvailableNotes(true);
          });
        }
      } else setNoteCount(1);
    }
  }, [game]);

  useEffect(() => {
    document.body.style.overflow =
      newStatusModal || editNoteModal || deleteNoteModal ? "hidden" : "unset";
  }, [newStatusModal, editNoteModal, deleteNoteModal]);

  function handleNewGameNoteInput(input) {
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
    window.location.reload();
  }

  return (
    loaded && (
      <>
        <SingleGamePageModals
          newStatusModal={newStatusModal}
          setNewStatus={setNewStatus}
          handleStatusChange={handleStatusChange}
          setModalDisplay={setModalDisplay}
          editNoteModal={editNoteModal}
          noteToEdit={noteToEdit}
          setNoteToEdit={setNoteToEdit}
          handleNoteEdit={handleNoteEdit}
          setEditModalDisplay={setEditModalDisplay}
          deleteNoteModal={deleteNoteModal}
          setDeleteNoteModal={setDeleteNoteModal}
        />
        <GameInfo
          source={game}
          setModalDisplay={setModalDisplay}
          handleNewGameNoteInput={handleNewGameNoteInput}
          handleNoteAdd={handleNoteAdd}
        />
        {typeof notesKeys !== "string" && availableNotes && (
          <div className={`singleGameNotes`}>
            {notesKeys.map((index) => {
              if (game.note[index].length > 0) {
                return (
                  <GameNotes
                    className=""
                    key={index}
                    index={index}
                    source={game}
                    setNoteToEdit={setNoteToEdit}
                    setEditModalDisplay={setEditModalDisplay}
                    setDeleteNoteModal={setDeleteNoteModal}
                  />
                );
              }
            })}
          </div>
        )}
      </>
    )
  );
}

function GameInfo({
  source,
  setModalDisplay,
  handleNewGameNoteInput,
  handleNoteAdd,
}) {
  return (
    <div className="singleGameDiv">
      <div className="singleGameLeft">
        <h1>{source.name}</h1>
        <div className="singleGameInfo">
          <h4>Released: {source.releaseDate}</h4>
          <h4>Genre: {source.genre}</h4>
          <h4>Multiplayer: {source.multiplayer}</h4>
          <div className="editStatusContainer">
            <h4>Status: {source.status}</h4>
            <button
              className="editStatusButton"
              onClick={() => {
                setModalDisplay(true);
              }}
            >
              Edit status
            </button>
          </div>

          <h4>
            Available on:
            {
              <Platforms
                source={source}
                containerClasses={"platformIcons singleGamePlatforms"}
              />
            }
          </h4>
        </div>
        <GameNoteCreateArea
          handleNoteAdd={handleNoteAdd}
          handleNewGameNoteInput={handleNewGameNoteInput}
        />
      </div>
      <div className="singleGameRight">
        <img src={source.img} />
      </div>
    </div>
  );
}

function GameNotes({
  index,
  source,
  setNoteToEdit,
  setEditModalDisplay,
  setDeleteNoteModal,
}) {
  return (
    <div className="gameNote">
      <p>{source.note[index]}</p>
      <div className="notesButtons">
        <button
          onClick={() => {
            setNoteToEdit({
              noteKey: index,
              noteText: source.note[index],
            });
            setEditModalDisplay(true);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            setNoteToEdit({
              noteKey: index,
              noteText: "",
            });
            setDeleteNoteModal(true);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function GameNoteCreateArea({ handleNoteAdd, handleNewGameNoteInput }) {
  return (
    <div className="noteInputContainer">
      <label htmlFor="gameNotesArea">
        <h4>New note:</h4>
      </label>
      <textarea
        id="gameNotesArea"
        name="gameNotesArea"
        className="gameNotesArea"
        onChange={(event) => {
          handleNewGameNoteInput(event.target.value);
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
  );
}
