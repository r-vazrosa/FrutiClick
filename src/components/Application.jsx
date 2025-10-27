import '../styles/Application.css';


const Application = ({ iconPath, name, openApp}) => (
<div className="app">
    <button
      type="button"
      className="app-button"
      onClick={() => openApp && openApp(name)}
      title={`Open ${name}`}>
      <img src={iconPath} alt={name} />
      <p>{name}</p>
    </button>
  </div>
);

export default Application;


