import "../styles/modal.css";

export function Modal({ modalContent, modalClassName }) {
  return <div className={modalClassName}>{modalContent}</div>;
}
