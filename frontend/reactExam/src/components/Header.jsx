import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import "../styles/header.css";
import { useState } from "react";

export function Header() {
  const [modalDisplay, setModalDisplay] = useState(false);

  return (
    <header>
      <div className="headerLeft">
        <div className="headerLeftTop">
          <Link to={"/"}>
            <img
              src="https://i.redd.it/qe9k0tyayre21.png"
              alt="gamePageLogo"
            ></img>
          </Link>
        </div>
        <div className="headerLeftBottom">LET THE GAMES BEGIN</div>
      </div>
      <div className="headerRight">
        <div className="headerRightTop">
          <button
            onClick={() => {
              setModalDisplay(!modalDisplay);
            }}
          >
            Categories
          </button>
        </div>
        <div className="headerRightBottom">
          <Link to="/addGame">
            <button>Add game</button>
          </Link>
        </div>
        <Modal
          modalClassName={modalDisplay ? "modalOn" : "modalOff"}
          modalContent={
            <div className="menuModal">
              <Link to={"/psgames"}>
                <p>Playstation games</p>
              </Link>
              <Link to={"/xboxgames"}>
                <p>Xbox games</p>
              </Link>{" "}
              <Link to={"/pcgames"}>
                <p>PC games</p>
              </Link>
            </div>
          }
        />
      </div>
    </header>
  );
}
