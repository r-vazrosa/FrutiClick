import '../styles/Setting.css';

const Setting = ({ iconPath, name }) => {
  const publicUrl = process.env.PUBLIC_URL || "";

  return (
    <div id="setting">
      <img src={`${publicUrl}${iconPath}`} alt={name} />
      <h2>{name}</h2>
    </div>
  );
};

export default Setting;
