import React from 'react';
import man from './man.svg';
import usd from './usd.svg';
import './Board.css';

function CoinCell(props) {
  return (
    <div className="Board-cell Board-coin">
      <img src={usd} alt="coin" />
    </div>
  );
}

function EmptyCell(props) {
  return (
    <div className="Board-cell"></div>
  );
}

function PlayerCell(props) {
  return (
    <div className="Board-cell">
      <img src={man} alt="player" />
    </div>
  );
}

function BoardCell(props) {
  switch(props.type) {
    case 'coin':
      return <CoinCell />;
    case 'player':
      return <PlayerCell />;
    default:
      return <EmptyCell />;
  }

}

function BoardRow(props) {
  const cells = props.row.map((cell, index) => <BoardCell key={index} type={cell}/>);
  return (
    <div className="Game-row">
      {cells}
    </div>
  );
}

function Board(props) {
  const rows = props.board.map((row, index) => <BoardRow key={index} row={row}/>);
  return (
    <div className="Board Game-col">
      {rows}
    </div>
  );
}

export default Board;
