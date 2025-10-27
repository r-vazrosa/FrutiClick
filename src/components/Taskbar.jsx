import '../styles/Taskbar.css';
import TaskbarTab from "./TaskbarTab.jsx"
import TaskbarClock from "./TaskbarClock.jsx"



const Taskbar = ({openApp}) => (
              <div id="taskbar">
                <div id="taskbar-start">
                    <img src="/images/icon_2.png" />
                    <p>start</p>
                </div>
                
                <div id="taskbar-tab-section">
                    <TaskbarTab name="Fruti-Click" iconPath="/images/840.ico"openApp={openApp}/>
                    <TaskbarTab name="Shop" iconPath="/images/951.ico" openApp={openApp}/>
                    <TaskbarTab name="Settings" iconPath="/images/507.ico" openApp={openApp}/>
                    <TaskbarTab name="Info" iconPath="/images/964.ico" openApp={openApp}/>
                    <TaskbarTab name="Contact" iconPath="/images/793.ico" openApp={openApp}/>
                </div>
                <TaskbarClock />
            </div>
);

export default Taskbar;
