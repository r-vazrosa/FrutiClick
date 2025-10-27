import '../styles/Config.css';


const Config = ({ title, description }) => (
    <div id="config">
        <div id="config-subsection">
            <h2>{title}: </h2>
            <button>Off</button>
        </div>
        <p>{description}</p>
    </div>
);

export default Config;