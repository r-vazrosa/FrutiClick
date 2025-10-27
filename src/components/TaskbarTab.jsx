import '../styles/TaskbarTab.css';

const TaskbarTab = ({ iconPath, name, openApp }) => {
  const publicUrl = process.env.PUBLIC_URL || "";

  return (
    <button
      type="button"
      className="taskbar-tab"
      onClick={() => openApp && openApp(name)}
      title={`Open ${name}`}
    >
      <img src={`${publicUrl}${iconPath}`} alt={name} />
      <p>{name}</p>
    </button>
  );
};

export default TaskbarTab;
