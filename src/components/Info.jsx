import '../styles/Info.css';
import InfoSection from './InfoSection.jsx';


const Info = () => (
    <div id="info">
        <InfoSection title="What Even is This?" description="Fruti-Click is a frutiger aero inspired parody of cookie clicker. The goal of the game is to click inside of the Fruti-Click application and get starries. Starries are the currency of this game and are used to buy stuff from the shop, buying stuff from the shop gives you more starries, and it's rinse and repeat." />
        <InfoSection title="Why Does it Look Like That?" description="Fruti-Click is based on the frutiger aero asethethic. This asethethic comes from the old internet and has been growing in popularity recently due to how corporate everything feels now on the internet. The Windows XP inspired OS is reminisecent of the asethethic. " />
        <InfoSection title="What are Random Events?" description="There are multiple random events that could happen throughout the game, these can give you multipliers or other effects that will help you on your journey of getting the final item in the shop." />
        <InfoSection title="Closing Remarks" description="This game is a small project passion of mine and is very nostalgic to me since when I was 3 I was already on a computer with this kind of style and I wanted to do something with that, I hope you enjoy it." />
    </div>
);

export default Info;
