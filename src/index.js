import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const elem = <h2>Hello World!</h2>;

const text = 'Hello World';

const elem = (
  <div>
    <h2>{text}</h2>
    <input type="text" />
    <button>test</button>
  </div>
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {elem}
  </React.StrictMode>
);
