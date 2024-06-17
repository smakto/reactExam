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
            src="https://www.pngkey.com/png/full/236-2366469_playstation-logos-brands-and-logotypes-playstation-store-logo.png"
            alt="psLogo"
          />
        </a>
        <a href="https://www.xbox.com/en-US/xbox-game-pass" target="_blank">
          <img
            src="https://cdn.freebiesupply.com/logos/large/2x/xbox-2-logo-black-and-white.png"
            alt="xboxGamePassLogo"
          />
        </a>
      </div>
    </footer>
  );
}
