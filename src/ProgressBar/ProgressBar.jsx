import React from 'react';
import './ProgressBar.css';

const CircleProgressBar = ({ percentage, steps }) => {
    // Calculate the current step based on the percentage
    const currentStep = Math.ceil((percentage / 100) * 4) || 1;
    const arr = [];
    for (let i = 1; i <= steps; i++) {
        arr.push(i);
    }
    
    return (
      <div className="progress-container">
        <div className="progress-bar">
          {arr.map((step) => (
            <React.Fragment key={step}>
              <div className={`circle ${currentStep >= step ? 'active' : ''}`}>
                {step}
              </div>
              {step !== 4 && (
                <div
                  className={`line ${currentStep >= step + 1 ? 'filled' : ''}`}
                  
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="percentage">{percentage}%</div>
      </div>
    );
  };
  
  export default CircleProgressBar;