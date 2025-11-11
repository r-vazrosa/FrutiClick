import React, { useEffect, useState } from "react";
import "../styles/ClickComponent.css";

function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

function getCookie(name) {
  const v = `; ${document.cookie}`;
  const parts = v.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift() || "");
  return null;
}

const STAR_COOKIE = "fruti-starries";

const ClickComponent = () => {
  const publicUrl = process.env.PUBLIC_URL || "";
  const [starries, setStarries] = useState(0);

  useEffect(() => {
    const saved = parseInt(getCookie(STAR_COOKIE), 10);
    if (!isNaN(saved)) {
      setStarries(saved);
    }
  }, []);

  const handleClick = () => {
    const newCount = starries + 1;
    setStarries(newCount);
    setCookie(STAR_COOKIE, newCount);
  };

  return (
    <div id="click-component">
      <div id="click-component-info">
        <p></p>
      </div>

      <div id="click-component-gather" onClick={handleClick}>
        <img
          src={`${publicUrl}/images/click-img.gif`}
          alt="Click animation"
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default ClickComponent;