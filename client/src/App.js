import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Main from './components/ClientMain.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/react-fontawesome';
import './css/main.css';
import {SocketContext, socket} from './context/socket';

function App() {

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
