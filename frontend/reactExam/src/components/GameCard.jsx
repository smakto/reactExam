import { useNavigate } from "react-router-dom";
import { Platforms } from "./Platforms";
import { Modal } from "./Modal";
import { useEffect, useState } from "react";

export function GameCard({ data, dataDel }) {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");

  useEffect(() => {
    document.body.style.overflow = modalDisplay ? "hidden" : "unset";
  }, [modalDisplay]);

  return (
    <>
      <Modal
        modalClassName={modalDisplay ? "gameCardModalOn" : "gameCardModalOff"}
        modalContent={
          <DeleteConfirmation
            deleteConfirmClass={
              modalDisplay
                ? "deleteCardConfirmationOn"
                : "deleteCardConfirmationOff"
            }
            deleteEvent={() => {
              dataDel(idToDelete);
              setModalDisplay(false);
              window.location.reload();
            }}
            cancelEvent={() => {
              setModalDisplay(false);
            }}
          />
        }
      />
      <CardContent
        cardData={data}
        toggleModal={setModalDisplay}
        setIdToDelete={setIdToDelete}
        modalState={modalDisplay}
      />
    </>
  );
}

function CardContent({ cardData, toggleModal, setIdToDelete, modalState }) {
  const navigate = useNavigate();
  return (
    cardData &&
    cardData.map((game) => {
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

          <h3>
            {game.name} ({game.releaseDate})
          </h3>
          <h5>Genre: {game.genre}</h5>
          <h5>Status: {game.status}</h5>
          <div className="cardBottom">
            <Platforms source={game} containerClasses={"platformIcons"} />
            <div className="gameCardButtonContainer">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  toggleModal(!modalState);
                  setIdToDelete(game._id);
                }}
              >
                <i className="fa-solid fa-trash fa-xl"></i>
              </button>
            </div>
          </div>
        </div>
      );
    })
  );
}

function DeleteConfirmation({ deleteEvent, cancelEvent, deleteConfirmClass }) {
  return (
    <div className={deleteConfirmClass}>
      <p>Are you sure you want to delete this game permanently? </p>
      <p>You will not be able to restore it. </p>
      <div className="deleteConfirmationButtons">
        <button onClick={deleteEvent}>Delete</button>
        <button onClick={cancelEvent}>Cancel</button>
      </div>
    </div>
  );
}
