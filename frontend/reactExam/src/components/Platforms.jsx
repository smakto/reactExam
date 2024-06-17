export function Platforms({ source, containerClasses }) {
  return (
    <div className={containerClasses}>
      {source.platform.Playstation ? (
        <i className="fa-brands fa-playstation fa-xl"></i>
      ) : null}
      {source.platform.Xbox ? (
        <i className="fa-brands fa-xbox fa-xl"></i>
      ) : null}
      {source.platform.PC ? (
        <i className="fa-solid fa-computer fa-xl"></i>
      ) : null}
    </div>
  );
}
