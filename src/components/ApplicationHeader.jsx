import React, { useEffect, useRef, useState } from "react";
import "../styles/ApplicationHeader.css";

const COOKIE_NAME = "fruti_username";

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

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

const AccountModal = ({ open, initialValue = "", onClose, onSave }) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="ah-modal-overlay" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="ah-modal" onMouseDown={(e) => e.stopPropagation()}>
        <h3>Set account name</h3>
        <input
          ref={inputRef}
          className="ah-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter username"
        />
        <div className="ah-modal-actions">
          <button className="ah-btn" onClick={() => { onSave(value); }}>
            Save
          </button>
          <button
            className="ah-btn ah-btn-secondary"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className="ah-btn ah-btn-danger"
            onClick={() => {
              deleteCookie(COOKIE_NAME);
              onSave("");
            }}
            title="Remove saved username"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

const ApplicationHeader = () => {
  const publicUrl = process.env.PUBLIC_URL || "";
  const [username, setUsername] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // load cookie on mount
  useEffect(() => {
    const saved = getCookie(COOKIE_NAME);
    if (saved) {
      setUsername(saved);
    }
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const saveUsername = (name) => {
    const trimmed = (name || "").trim();
    if (trimmed) {
      setCookie(COOKIE_NAME, trimmed, 365);
      setUsername(trimmed);
    } else {
      // if empty, remove cookie and clear display
      deleteCookie(COOKIE_NAME);
      setUsername("");
    }
    closeModal();
  };

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
        <div
          id="header-account-section"
          onClick={openModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openModal(); }}
          aria-label="Open account name editor"
        >
          <img src={`${publicUrl}/images/msn-guy.png`} alt="Account" />
          <p>{username || "Account-Name"}</p>
        </div>

        <div id="header-currency-section">
          <img src={`${publicUrl}/images/starry.gif`} alt="Currency" />
          <p>999,999,999</p>
        </div>
      </div>

      <AccountModal
        open={modalOpen}
        initialValue={username}
        onClose={closeModal}
        onSave={saveUsername}
      />
    </div>
  );
};

export default ApplicationHeader;
