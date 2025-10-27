
import './App.css';

import React, { useState } from "react";

import Bubbles from "./components/Bubbles.jsx"
import Taskbar from "./components/Taskbar.jsx"
import AppCol from "./components/AppCol.jsx"
import ApplicationHeader from "./components/ApplicationHeader.jsx"

import FrutiClick from "./components/FrutiClick.jsx"
import Contact from "./components/Contact.jsx"
import Info from "./components/Info.jsx"
import Shop from "./components/Shop.jsx"
import Settings from "./components/Settings.jsx"

import MusicPlayer from "./components/MusicPlayer.jsx"



function App() {
  const [currentApp, setCurrentApp] = useState("Fruti-Click"); // default view


  const renderApplication = () => {
    switch (currentApp) {
      case "Fruti-Click":
        return <FrutiClick />;
      case "Contact":
        return <Contact />;
      case "Info":
        return <Info />;
      case "Shop":
        return <Shop />;
      case "Settings":
        return <Settings />;
      default:
        return <div />;
    }
  };

  return (
    <div>
        <Bubbles />

        <div id="content">
            <MusicPlayer />
            <div id="screen">

                <AppCol openApp={setCurrentApp}/>

                <div id="application-screen">
                    <ApplicationHeader />
                    <div id="application-content">
                        {renderApplication()}
                    </div>
                </div>
            </div>
          <Taskbar openApp={setCurrentApp}/>
        </div>
      </div>
  );
}

export default App;
