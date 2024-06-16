import "../styles/footer.css";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <div>
        <a href="https://www.ign.com/" target="_blank">
          <img
            className="ignLogo"
            src="https://static1.squarespace.com/static/5a4e740c4c326d723144bf21/t/5a4ebe080852296d70939694/1716927491832/"
            alt="ignLogo"
          />
        </a>
        <a href="https://store.steampowered.com/" target="_blank">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Steam_2016_logo_black.svg/2560px-Steam_2016_logo_black.svg.png"
            alt="steamLogo"
          />
        </a>
        <a
          href="https://store.playstation.com/en-us/pages/latest"
          target="_blank"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2b/PlayStation_Store.png"
            alt="psLogo"
          />
        </a>
        <a href="https://www.xbox.com/en-US/xbox-game-pass" target="_blank">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Xbox_Game_Pass_2020_logo_-_colored_version.svg/640px-Xbox_Game_Pass_2020_logo_-_colored_version.svg.png"
            alt="xboxGamePassLogo"
          />
        </a>
      </div>
    </footer>
  );
}
