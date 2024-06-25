import "../styles/placeholder.css";

export function PlaceHolderDiv({ className, alertText }) {
  return (
    <div className={className}>
      <h2>{alertText}</h2>
    </div>
  );
}
