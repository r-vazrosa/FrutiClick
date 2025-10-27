import '../styles/Settings.css';
import Setting from './Setting.jsx';
import Config from "./Config.jsx";

const Settings = () => (
  <div id="settings">
    <div id="setting-picker">
      <Setting iconPath="/images/1042.ico" name="Visual"/>
      <Setting iconPath="/images/1042.ico" name="Sound" />
      <Setting iconPath="/images/1042.ico" name="Preferrenes" />
    </div>

    <div id="config-section">
        <Config title="Bubbles" description="Toggles on and off the background bubble animation." />
        <Config title="Alternative Color" description="Changes the color scheme to an alternative of the applications." />
        <Config title="Remove Apps" description="Removes the apps from the left side of the screen on the desktop." />
    </div>
  </div>
);

export default Settings;
