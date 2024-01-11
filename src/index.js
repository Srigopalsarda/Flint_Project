import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import reportWebVitals from './reportWebVitals';
import CustomAlertTemplate from './CustomAlertTemplate';
const options = {
  
  position: positions.TOP_RIGHT,
  type: 'error',
  timeout: 5000,
  offset: '5px',
  containerStyle: {
    // backgroundColor: '#ff0f0f',
    width : '500px',
    borderRadius : '5px',
    marginLeft:"1050px",
    lineHeight: '20px',
    fontSize : '10px',
    // offset: '30px',
  },
  // you can also just use 'scale'
  transition: transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider template= {CustomAlertTemplate} {...AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  </React.StrictMode>
);

reportWebVitals();
