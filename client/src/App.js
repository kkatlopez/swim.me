import React from "react";
import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
//import './App.css';
//import ClientTopBar from './components/ClientTopNav.js';
import Main from './components/ClientMain.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

function App() {
  const [data, setData] = React.useState(null);

  /*
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/
  
  return (
    <div className="App">
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
