import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

const allowedValues = Array(19).fill(null).map((e, i) => i + 2);
let cols = null,
    rows = null;
while(allowedValues.indexOf(rows) === -1) {
  rows = parseInt(window.prompt("Please enter the board width\r\n\t(The value must be between 2 and 20)"), 10);
}
while(allowedValues.indexOf(cols) === -1) {
  cols = parseInt(window.prompt("Please enter the board height\r\n\t(The value must be between 2 and 20)"), 10);
}

ReactDOM.render((
  <Game 
    columns={cols} 
    rows={rows} 
  />
), document.getElementById('root'));
registerServiceWorker();
