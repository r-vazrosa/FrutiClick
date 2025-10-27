import '../styles/Setting.css';


const Setting = ({ iconPath, name }) => (
  <div id="setting">
        <img src={iconPath} />
        <h2>{name}</h2>
      </div>
);

export default Setting;