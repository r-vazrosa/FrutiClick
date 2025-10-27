import '../styles/ApplicationHeader.css';

const ApplicationHeader = () => {
  const publicUrl = process.env.PUBLIC_URL || "";

  return (
    <div id="application-header">
      <div id="application-header-title">
        <div id="application-header-title-icon-name">
          <img src={`${publicUrl}/images/840.ico`} alt="App icon" />
          <p>Fruti-Click</p>
        </div>

        <img
          src={`${publicUrl}/images/close.png`}
          id="close-button"
          alt="Close"
        />
      </div>

      <div id="application-header-content">
        <div id="header-account-section">
          <img src={`${publicUrl}/images/msn-guy.png`} alt="Account" />
          <p>Account-Name</p>
        </div>

        <div id="header-currency-section">
          <img src={`${publicUrl}/images/starry.gif`} alt="Currency" />
          <p>999,999,999</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationHeader;
