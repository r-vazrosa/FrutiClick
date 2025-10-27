import '../styles/TaskbarTab.css';


const TaskbarTab = ({ iconPath, name, openApp}) => (

     <button
      type="button"
      class="taskbar-tab"
      onClick={() => openApp && openApp(name)}
      title={`Open ${name}`}>
      <img src={iconPath} alt={name} />
      <p>{name}</p>
    </button>
);

export default TaskbarTab;
