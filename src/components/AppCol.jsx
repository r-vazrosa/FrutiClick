import '../styles/AppCol.css';
import Application from "./Application.jsx"



const AppCol = ({ openApp }) => (
              <div id="app-col">
                    <Application name="Fruti-Click" iconPath="/images/840.ico" openApp={openApp}/>
                    <Application name="Shop" iconPath="/images/951.ico" openApp={openApp}/>
                    <Application name="Settings" iconPath="/images/507.ico" openApp={openApp}/>
                    <Application name="Info" iconPath="/images/964.ico" openApp={openApp}/>
                    <Application name="Contact" iconPath="/images/793.ico" openApp={openApp}/>
                </div>
);

export default AppCol;
