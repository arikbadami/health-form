import React from 'react';
import './ThankYou.css';

function ThankYou() {
  return (
    <div className="thank-you-wrapper">
      <div className="thank-you-container">
        <div className="checkmark-circle pulse">
          <div className="checkmark"></div>
        </div>
        <h2>Thank you!</h2>
        <p>We will get back to you shortly.</p>
      </div>
    </div>
  );
}

export default ThankYou;