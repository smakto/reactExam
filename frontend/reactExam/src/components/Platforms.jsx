export function Platforms({ source, containerClasses }) {
  return (
    <div className={containerClasses}>
      {source.platform.Playstation ? (
        <i className="fa-brands fa-playstation fa-l"></i>
      ) : (
        ""
      )}
      {source.platform.Xbox ? <i className="fa-brands fa-xbox fa-l"></i> : ""}
      {source.platform.PC ? <i className="fa-solid fa-computer fa-l"></i> : ""}
    </div>
  );
}
