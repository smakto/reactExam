import "../styles/footer.css";

export function Footer() {
  return (
    <footer>
      <div>
        <Logo
          urlLink={"https://www.ign.com/"}
          imgSrc={
            "https://static1.squarespace.com/static/5a4e740c4c326d723144bf21/t/5a4ebe080852296d70939694/1716927491832/"
          }
          alt={"ignLogo"}
        />
        <Logo
          urlLink={"https://store.steampowered.com/"}
          imgSrc={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Steam_2016_logo_black.svg/2560px-Steam_2016_logo_black.svg.png"
          }
          alt={"steamLogo"}
        />
        <Logo
          urlLink={"https://store.playstation.com/en-us/pages/latest"}
          imgSrc={
            "https://www.pngkey.com/png/full/236-2366469_playstation-logos-brands-and-logotypes-playstation-store-logo.png"
          }
          alt={"psLogo"}
        />
        <Logo
          urlLink={"https://www.xbox.com/en-US/xbox-game-pass"}
          imgSrc={
            "https://cdn.freebiesupply.com/logos/large/2x/xbox-2-logo-black-and-white.png"
          }
          alt={"xboxGamePassLogo"}
        />
      </div>
    </footer>
  );
}

function Logo({ urlLink, imgSrc, alt }) {
  return (
    <a href={urlLink} target="_blank">
      <img src={imgSrc} alt={alt} />
    </a>
  );
}
