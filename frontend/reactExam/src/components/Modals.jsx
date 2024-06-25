import "../styles/modals.css";

export function SingleGamePageModals({
  newStatusModal,
  setNewStatus,
  handleStatusChange,
  setModalDisplay,
  editNoteModal,
  noteToEdit,
  setNoteToEdit,
  handleNoteEdit,
  setEditModalDisplay,
  deleteNoteModal,
  setDeleteNoteModal,
}) {
  return (
    <>
      <StatusEditModal
        newStatusModal={newStatusModal}
        setNewStatus={setNewStatus}
        handleStatusChange={handleStatusChange}
        setModalDisplay={setModalDisplay}
      />
      <NoteEditModal
        editNoteModal={editNoteModal}
        noteToEdit={noteToEdit}
        setNoteToEdit={setNoteToEdit}
        handleNoteEdit={handleNoteEdit}
        setEditModalDisplay={setEditModalDisplay}
      />
      <DeleteNoteModal
        deleteNoteModal={deleteNoteModal}
        handleNoteEdit={handleNoteEdit}
        setDeleteNoteModal={setDeleteNoteModal}
      />
    </>
  );
}

export function Modal({ modalContent, modalClassName }) {
  return <div className={modalClassName}>{modalContent}</div>;
}

function StatusEditModal({
  newStatusModal,
  setNewStatus,
  handleStatusChange,
  setModalDisplay,
}) {
  return (
    <Modal
      modalClassName={newStatusModal ? "modalBckgOn" : "modalBckgOff"}
      modalContent={
        <div
          className={newStatusModal ? "newStatusModalOn" : "newStatusModalOff"}
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
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setModalDisplay(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      }
    />
  );
}

function NoteEditModal({
  editNoteModal,
  noteToEdit,
  setNoteToEdit,
  handleNoteEdit,
  setEditModalDisplay,
}) {
  return (
    <Modal
      modalClassName={editNoteModal ? "modalBckgOn" : "modalBckgOff"}
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
            <button onClick={() => setEditModalDisplay(false)}>Cancel</button>
          </div>
        </div>
      }
    />
  );
}

function DeleteNoteModal({
  deleteNoteModal,
  handleNoteEdit,
  setDeleteNoteModal,
}) {
  return (
    <Modal
      modalClassName={deleteNoteModal ? "modalBckgOn" : "modalBckgOff"}
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
            <button onClick={() => setDeleteNoteModal(false)}>Cancel</button>
          </div>
        </div>
      }
    />
  );
}
