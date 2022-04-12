import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// var context = require('rabbit.js').createContext('amqps://' + String(process.env.RABBITMQUSER) + ':' + String(process.env.RABBITMQPASS) + '@woodpecker.rmq.cloudamqp.com/' + String(process.env.RABBITMQUSER));
// // var context = require('rabbit.js').createContext('amqps://dyifajdi:dY01hBir0J82rhSbYjBC0TwMH0BxjHSt@woodpecker.rmq.cloudamqp.com/dyifajdi');
// context.on('ready', function() {
//   var pub = context.socket('PUB'), sub = context.socket('SUB');
//   sub.pipe(process.stdout);
//   sub.connect('events', function() {
//     pub.connect('events', function() {
//       pub.write(JSON.stringify({welcome: 'rabbit.js'}), 'utf8');
//     });
//   });
// });


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
