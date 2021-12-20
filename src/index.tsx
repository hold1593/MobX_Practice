import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './screens/App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './stores/Context';
import { RootStore } from './stores/RootStore';

const rootStore = new RootStore();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
