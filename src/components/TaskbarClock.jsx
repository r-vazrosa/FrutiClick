import '../styles/TaskbarClock.css';

const TaskbarClock = () => {
  const publicUrl = process.env.PUBLIC_URL || "";

  return (
    <div id="taskbar-clock">
      <img src={`${publicUrl}/images/icon_1.ico`} alt="Clock icon" />
      <p id="taskbar-clock-time">12:00 PM</p>
    </div>
  );
};

export default TaskbarClock;
