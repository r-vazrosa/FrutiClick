import '../styles/InfoSection.css';


const InfoSection = ({ title, description }) => (
    <div id="info-section">
        <h2>{title}</h2>
        <p>
            {description}
        </p>
    </div>
);

export default InfoSection;
