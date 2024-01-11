import React from 'react';

const CustomAlertTemplate = ({ style, options, message, close }) => {
  // Define a variable to hold the border color based on the alert type
  let borderColor = '';

  if (options.type === 'success') {
    borderColor = 'green'; // Set border color for success alerts
  } else if (options.type === 'error') {
    borderColor = 'red'; // Set border color for error alerts
  }

  return (
    <div style={{ ...style, fontSize: '18px', width: '500px', paddingTop: '10px', backgroundColor: 'black', border: `5px solid ${borderColor}`, borderRadius: '10px', display: 'flex', justifyContent: 'space-around' }}>
      {options.type === 'info' && ' ⚠ '}
      {options.type === 'success' && ' ✅ '}
      {options.type === 'error' && ' ❗ '}
      {message}
      <button style={{ backgroundColor: 'black', color: 'white', marginBottom: '10px' }} onClick={close}>
        X
      </button>
    </div>
  );
};

export default CustomAlertTemplate;
