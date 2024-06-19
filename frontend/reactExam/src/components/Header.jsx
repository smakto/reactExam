import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import "../styles/header.css";
import { useState } from "react";
import { useGeneralContext } from "../contexts/useContext";

export function Header() {
  const [modalDisplay, setModalDisplay] = useState(false);

  return (
    <header>
      <MenuModal
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
      />
      <HeaderLeft />
      <HeaderRight
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
      />
    </header>
  );
}

function HeaderLeft() {
  return (
    <div className="headerLeft">
      <div className="headerLeftTop">
        <p>LET THE GAMES BEGIN</p>

        <Link to={"/"}>
          <img
            src="https://i.redd.it/qe9k0tyayre21.png"
            alt="gamePageLogo"
          ></img>
        </Link>
      </div>
      <div className="headerLeftBottom">
        <p>PERSONAL GAME LIBRARY</p>
      </div>
    </div>
  );
}

function HeaderRight({ modalDisplay, setModalDisplay }) {
  return (
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
    </div>
  );
}

function MenuModal({ modalDisplay, setModalDisplay }) {
  return (
    <Modal
      modalClassName={modalDisplay ? "modalOn" : "modalOff"}
      modalContent={
        <div
          className={modalDisplay ? "menuModalOn" : "menuModalOff"}
          onMouseLeave={() => {
            setModalDisplay(false);
          }}
        >
          <MenuLink urlLink={"/games"} category={"All games"} />
          <MenuLink urlLink={"/psgames"} category={"Playstation games"} />
          <MenuLink urlLink={"/xboxgames"} category={"Xbox games"} />
          <MenuLink urlLink={"/pcgames"} category={"PC games"} />
          <MenuLink urlLink={"/multiplayer"} category={"Multiplayer games"} />
          <MenuLink urlLink={"/genre/action"} category={"Action games"} />
          <MenuLink urlLink={"/genre/adventure"} category={"Adventure games"} />
          <MenuLink urlLink={"/genre/racing"} category={"Racing games"} />
          <MenuLink urlLink={"/genre/rogue"} category={"Roguelike games"} />
          <MenuLink urlLink={"/genre/rpg"} category={"RPG games"} />
          <MenuLink urlLink={"/genre/strategy"} category={"Strategy games"} />
          <MenuLink urlLink={"/genre/turn"} category={"Turn-based games"} />
        </div>
      }
    />
  );
}

function MenuLink({ urlLink, category }) {
  const myContext = useGeneralContext();

  return (
    <Link
      to={urlLink}
      onClick={() => {
        myContext.dispatch({
          type: "NEWPAGEHEAD",
          newPageHead: category,
        });
      }}
    >
      <p>{category}</p>
    </Link>
  );
}
