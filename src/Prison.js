import React from 'react';
import princess from './woman.svg';
import './Prison.css';

function CageBar(props) {
  return (
    <div className="Cage-bar"></div>
  );
}

function Prison(props) {
  const bars = Array(props.bars).fill(null).map((bar, index) => <CageBar key={index}/>)
  return (
    <div className="Game-row Prison-cage">
      {bars}
      <img className={'Prison-princess' + (bars.length === 0 ? ' Celebration' : '')} src={princess} alt="queen"/>
    </div>
  );
}

export default Prison;
