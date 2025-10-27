import '../styles/ApplicationHeader.css';


const ApplicationHeader = () => (
    <div id="application-header">
        <div id="application-header-title">
            <div id="application-header-title-icon-name">
                <img src="/images/840.ico" />
                <p>Fruti-Click</p>
            </div>
                            
            <img src="/images/close.png" id="close-button" />
        </div>
        <div id="application-header-content">
            <div id="header-account-section">
                <img src="/images/msn-guy.png" />
                <p>Account-Name</p>
            </div>
            <div id="header-currency-section">
                <img src="/images/starry.gif" />
                <p>999,999,999</p>
            </div>
        </div>
    </div>
);

export default ApplicationHeader;
