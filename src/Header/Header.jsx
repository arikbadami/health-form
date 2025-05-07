import React from 'react';
import './Header.css';

function Header({ title, onBackClick, onExitClick, hideButtons }) {
  return (
    <div className="header">
      {!hideButtons && <button className="back-button" onClick={onBackClick}>
        {"< Back"}
      </button>}
      <h1 className="title">{title}</h1>
      {!hideButtons && <button className="exit-button" onClick={onExitClick}>
        Exit X
      </button>}
    </div>
  );
}

export default Header;