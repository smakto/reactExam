import { useRef, useState } from "react";
import { useData } from "../hooks/useData";
import "../styles/addGamePage.css";

export function AddGamePage() {
  const { dataSet, addData } = useData("games");

  const [gameTitle, setGameTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [gameGenre, setGameGenre] = useState("");
  const [image, setGameImage] = useState("");

  const [isMultiplayer, setIsMultiplayer] = useState(false);

  const [onPlaystation, setOnPlaystation] = useState(false);
  const [onPC, setOnPC] = useState(false);
  const [onXbox, setOnXbox] = useState(false);

  function handleChange(value, setData) {
    setData(value);
  }

  function handleCheckbox(setChecked, isChecked) {
    setChecked(!isChecked);
  }

  console.log({
    Playstation: onPlaystation ? 1 : 0,
    Xbox: onXbox ? 1 : 0,
    PC: onPC ? 1 : 0,
  });

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
    </form>
  );
}

function Input({
  label,
  name,
  type,
  handleChange,
  setData,
  value,
  defaultChecked,
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={(event) => {
          handleChange(event.target.value, setData);
        }}
      ></input>
    </>
  );
}

function InputCheckbox({
  label,
  name,
  handleCheckbox,
  value,
  isChecked,
  setChecked,
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        key={Math.random()}
        type={"checkbox"}
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => {
          handleCheckbox(setChecked, isChecked);
        }}
      ></input>
    </>
  );
}
