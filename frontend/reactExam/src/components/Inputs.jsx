export function Input({
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
        required
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

export function InputCheckbox({
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
