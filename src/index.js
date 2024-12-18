import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AppStore from './store/AppStore';
import MaterialStore from './store/MaterialStore';
import CharStore from './store/CharStore';
import WeaponStore from './store/WeaponStore';
import RollStore from './store/RollStore';
import ArtsStore from './store/ArtsStore';

export const AppContext = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext.Provider value={{
        chars: new CharStore(),
        app: new AppStore(),
        materials: new MaterialStore(),
        weapons: new WeaponStore(),
        rolls: new RollStore(),
        arts: new ArtsStore()
      }}>
        <App />
      </AppContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
