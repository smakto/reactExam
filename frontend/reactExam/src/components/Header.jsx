import { Link } from "react-router-dom";
import "../styles/header.css";

export function Header() {
  return (
    <header>
      <div className="headerTop">
        <div className="headerTopLeft">
          <img
            src="https://i.redd.it/qe9k0tyayre21.png"
            alt="gamePageLogo"
          ></img>
        </div>
        <div className="headerTopRight">
          <button>Menu</button>
        </div>
      </div>
      <div className="headerBottom">
        <div className="headerBottomLeft">LET THE GAMES BEGIN </div>
        <div className="headerBottomRight">
          <Link to="/addGame">
            <button>Add game</button>
          </Link>
        </div>
      </div>
    </header>
  );
}
