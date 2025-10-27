import '../styles/Application.css';

const Application = ({ iconPath, name, openApp }) => {
  const publicUrl = process.env.PUBLIC_URL || "";

  return (
    <div className="app">
      <button
        type="button"
        className="app-button"
        onClick={() => openApp && openApp(name)}
        title={`Open ${name}`}
      >
        <img src={`${publicUrl}${iconPath}`} alt={name} />
        <p>{name}</p>
      </button>
    </div>
  );
};

export default Application;
