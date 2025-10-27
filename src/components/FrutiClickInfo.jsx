import '../styles/FrutiClickInfo.css';

const FrutiClickInfo = () => {
  const publicUrl = process.env.PUBLIC_URL || "";

  return (
    <div id="fruti-click-info">
      <div id="random-event-section">
        <p>random event prompt</p>
        <img src={`${publicUrl}/images/random_event.gif`} alt="Random event" />
      </div>

      <div id="fruti-click-info-section-group">
        <h1>Stats</h1>

        <div className="fruti-click-info-section">
          <h2>Total Hours:</h2>
          <p>0</p>
        </div>

        <div className="fruti-click-info-section">
          <h2>Lifetime Starries:</h2>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default FrutiClickInfo;

