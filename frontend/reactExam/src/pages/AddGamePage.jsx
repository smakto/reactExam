import { Input, InputCheckbox } from "../components/Inputs";
import { useEffect, useRef, useState } from "react";
import { useData } from "../hooks/useData";
import "../styles/addGamePage.css";

export function AddGamePage() {
  const { dataSet, addData } = useData("games");

  const [gameTitle, setGameTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [gameGenre, setGameGenre] = useState("");
  const [image, setGameImage] = useState("");
  const [isMultiplayer, setIsMultiplayer] = useState("No");
  const [onPlaystation, setOnPlaystation] = useState(false);
  const [onPC, setOnPC] = useState(false);
  const [onXbox, setOnXbox] = useState(false);
  const [gameStatus, setGameStatus] = useState("Wishlist");

  function handleChange(value, setData) {
    setData(value);
  }

  function handleCheckbox(setChecked, isChecked) {
    setChecked(!isChecked);
  }

  function handleSubmit() {
    const thisYear = new Date().getFullYear();
    if (onPlaystation === false && onPC === false && onXbox === false) {
      alert("Please select at least one platform");
    } else if (
      Number(releaseDate) < 1958 ||
      Number(releaseDate) > thisYear + 5
    ) {
      alert(
        `Please enter valid release date (later than 1958 & no later than ${
          thisYear + 5
        })`
      );
    } else {
      addData({
        genre: gameGenre,
        img: image,
        multiplayer: isMultiplayer,
        name: gameTitle,
        releaseDate: Number(releaseDate),
        status: gameStatus,
        platform: {
          Playstation: onPlaystation ? 1 : 0,
          Xbox: onXbox ? 1 : 0,
          PC: onPC ? 1 : 0,
        },
      });
    }
  }

  return (
    <form className="addGameForm">
      <Input
        type={"text"}
        label={"Game title"}
        name={"gameTitle"}
        handleChange={handleChange}
        setData={setGameTitle}
      />
      <Input
        type={"number"}
        label={"Release year"}
        name={"releaseDate"}
        handleChange={handleChange}
        setData={setReleaseDate}
      />
      <Input
        type={"text"}
        label={"Genre"}
        name={"genre"}
        handleChange={handleChange}
        setData={setGameGenre}
      />
      <Input
        type={"text"}
        label={"Image URL"}
        name={"image"}
        handleChange={handleChange}
        setData={setGameImage}
      />
      <div className="multiplayerSelector">
        <label htmlFor={"isMultiplayer"}>Multiplayer available?</label>
        <Input
          type={"radio"}
          label={"Yes"}
          name={"isMultiplayer"}
          value={"Yes"}
          handleChange={handleChange}
          setData={setIsMultiplayer}
        />
        <Input
          type={"radio"}
          label={"No"}
          name={"isMultiplayer"}
          value={"No"}
          defaultChecked={true}
          handleChange={handleChange}
          setData={setIsMultiplayer}
        />
      </div>

      <div className="platformSelector">
        <label htmlFor={"availablePlatforms"}>Platforms available?</label>

        <InputCheckbox
          label={"Playstation"}
          name={"availablePlatforms"}
          value={false}
          handleCheckbox={handleCheckbox}
          isChecked={onPlaystation}
          setChecked={setOnPlaystation}
        />
        <InputCheckbox
          label={"Xbox"}
          name={"availablePlatforms"}
          value={false}
          handleCheckbox={handleCheckbox}
          isChecked={onXbox}
          setChecked={setOnXbox}
        />
        <InputCheckbox
          label={"PC"}
          name={"availablePlatforms"}
          value={false}
          handleCheckbox={handleCheckbox}
          isChecked={onPC}
          setChecked={setOnPC}
        />
      </div>

      <div className="statusSelector">
        <select
          name="statusSelect"
          id="statusSelect"
          onChange={(event) => {
            setGameStatus(event.target.value);
          }}
        >
          <option defaultChecked value="Wishlist">
            Wishlist
          </option>
          <option value="In-progress">In-progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="formSubmitDiv">
        <input
          type="submit"
          value={"Add game"}
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        ></input>
      </div>
    </form>
  );
}