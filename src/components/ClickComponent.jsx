import '../styles/ClickComponent.css';

const ClickComponent = () => {
  const publicUrl = process.env.PUBLIC_URL || "";

  return (
    <div id="click-component">
      <div id="click-component-info">
        <p>0 click/s</p>
        <p>0 starries/s</p>
      </div>

      <div id="click-component-gather">
        <img
          src={`${publicUrl}/images/click-img.gif`}
          alt="Click animation"
        />
      </div>
    </div>
  );
};

export default ClickComponent;
