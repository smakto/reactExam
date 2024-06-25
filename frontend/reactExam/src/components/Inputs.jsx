export function Input({
  label,
  name,
  type,
  handleChange,
  setData,
  value,
  defaultChecked,
  id,
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        required
        type={type}
        id={id}
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

export function InputCheckbox({
  label,
  name,
  handleCheckbox,
  value,
  isChecked,
  setChecked,
  id,
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        key={Math.random()}
        id={id}
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
