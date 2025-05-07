import React, { useEffect, useState } from 'react';
import './FormComponent.css';

function FormComponent({ title, answerType, options, onSubmit, prefilledAnswer }) {
  const [answer, setAnswer] = useState('');

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    setAnswer(prefilledAnswer)
  }, [prefilledAnswer])

  const renderInputField = () => {
    switch (answerType) {
      case 'string':
        return (
          <input
            type="text"
            value={answer}
            onChange={handleChange}
            className="input-text"
            placeholder="Enter your answer"
          />
        );
      case 'mobile':
      case 'age':
      case 'number':
        return (
          <input
            type="number"
            value={answer}
            onChange={handleChange}
            className="input-number"
            placeholder={`Enter ${answerType}`}
          />
        );
      case 'mcq':
        return (
          <div className="radio-group">
            {options.map((option, index) => (
              <label key={index} className="radio-option">
                <input
                  type="radio"
                  value={option}
                  checked={answer === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h2>{title}</h2>
      {renderInputField()}
        <button 
        className={`btn btn-primary ${!answer ? 'disabled' : ''}`} 
        onClick={() => {
            onSubmit(answer);
            setAnswer("");
        }} 
        disabled={!answer}
        >
        Submit
        </button>
    </div>
  );
}

export default FormComponent;