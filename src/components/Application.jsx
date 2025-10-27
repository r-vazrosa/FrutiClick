import '../styles/Application.css';


const Application = ({ iconPath, name, openApp }) => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const src =
    iconPath.startsWith('http') || iconPath.startsWith(publicUrl)
      ? iconPath
      : `${publicUrl}${iconPath}`;

  return (
    <div className="app">
      <button
        type="button"
        className="app-button"
        onClick={() => openApp && openApp(name)}
        title={`Open ${name}`}
      >
        <img src={src} alt={name} />
        <p>{name}</p>
      </button>
    </div>
  );
};

export default Application;


