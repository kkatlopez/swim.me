import React, {useState, useEffect} from "react";
import { BrowserRouter } from 'react-router-dom';
//import './App.css';
//import ClientTopBar from './components/ClientTopNav.js';
import Main from './components/ClientMain.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/react-fontawesome';
import './css/main.css';
import {io} from "socket.io-client";
import {SocketContext, socket} from './context/socket';



function App() {
  // const [data, setData] = React.useState(null);
  //   console.log(window.location);
  //   const [response, setResponse] = useState("");
  //
  //   useEffect(() => {
  //     const socket = io(ENDPOINT);
  //     socket.on("FromAPI", data => {
  //       setResponse(data);
  //     });
  //     socket.connect(ENDPOINT);
  //   }, []);

    // return (
    //   <p>
    //     It's <time dateTime={response}>{response}</time>
    //   </p>
    // );

  /*
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/

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
