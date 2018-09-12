import React, { Component } from 'react';
import Board from './Board';
import Prison from './Prison';
import back from './back.svg';
import logo from './logo.svg';
import newGame from './new.svg';
import refresh from './refresh.svg';
import './Game.css';

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [this.__generateBoard(props.columns, props.rows)],
      moveCount: 0,
      time: '00:00:00'
    };
  }

  __gameIsComplete (coins) {
    return coins.length === 0 && this.state.history.length > 2;
  }

  __generateBoard (cols, rows) {
    const cells = Array(cols * rows).fill(null);
    const midIndex = cols * Math.floor(rows / 2) + Math.floor(rows / 2);
    cells[midIndex] = 'player';
    let coinCount = Math.ceil((cols + rows) / 2);
    while(coinCount > 0) {
      let randomIndex = Math.floor(Math.random() * cells.length);
      while(cells[randomIndex] === null) {
        cells[randomIndex] = 'coin';
        if(--coinCount === 0) {
          return Array(cols).fill(null).map(() => cells.splice(0, rows));
        }
      }
    }
  }

  __isIllegalMove (curPos, newPos) {
    return this.__isRowJumpMove(curPos, newPos) || this.__isRowJumpMove(newPos, curPos);
  }

  __isRowJumpMove (pos1, pos2) {
    return (pos1 % this.props.columns) === 0 && pos1 === (pos2 + 1);
  }

  componentDidMount () {
    this.focus();
    this.timeInSeconds = 0;
    this.timer = window.setInterval(this.tickTock.bind(this), 1000);
  }

  componentDidUpdate () {
    this.focus();
  }

  componentWillUnmount () {
    window.clearInterval(this.timer);
  }
  
  focus () {
    this.refs.Game.focus();
  }

  goBackTo (move) {
    if(move > -1) {
      this.setState({
        moveCount: move
      });
    }
  }

  handleKeyDown (e) {
    const validKeyPressActions = {
      ArrowDown:  pos => pos + this.props.rows,
      ArrowLeft:  pos => pos - 1,
      ArrowRight: pos => pos + 1,
      ArrowUp:    pos => pos - this.props.rows
    };
    if (validKeyPressActions.hasOwnProperty(e.key)) {
      e.preventDefault();
      let history = this.state.history.slice(0, this.state.moveCount + 1);
      let currentCells = history[this.state.moveCount].reduce((p, c) => p.concat(c), []);
      const currentPosition = currentCells.indexOf('player');
      const newPosition = validKeyPressActions[e.key](currentPosition);
      if (this.__isIllegalMove(currentPosition, newPosition)) {
        return;
      } else if (typeof newPosition === 'number' && newPosition < currentCells.length && newPosition > -1) {
        currentCells[currentPosition] = 'empty';
        currentCells[newPosition] = 'player';
        const newBoard = Array(this.props.columns).fill(null).map(() => currentCells.splice(0, this.props.rows));
        this.setState({
          history: history.concat([newBoard]),
          moveCount: history.length
        });
      }
    }
  }

  newGame () {
    this.componentWillUnmount();
    this.setState({
      history: [this.__generateBoard(this.props.columns, this.props.rows)],
      moveCount: 0,
      time: '00:00:00'
    });
    this.componentDidMount();
  }

  render () {
    const currentBoard = this.state.history[this.state.moveCount];
    const coins = currentBoard.reduce((p, c) => p.concat(c), []).filter((e) => e === 'coin');

    window.setTimeout(() => {
      if(this.__gameIsComplete(coins)) {
        alert(
        '▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬' +
        "\nCongraulations!!!\n" + 
        '▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬' +
        "\nYou saved the princess in " + this.state.time +
        ' using ' + this.state.history.length + " moves.\n" +
        '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬' +
        "\nGame Over!!!");
        this.newGame();
      }
    }, 2000);

    return (
      <div className="Game-row" onClick={() => this.focus()} onKeyDown={e => this.handleKeyDown(e)} ref="Game" tabIndex="0">
        <div className="Game-col Game-board">
          <Board board={currentBoard}/>
          <div className="Game-row Game-info">
            <img src={logo} className="Game-logo" alt="logo" />
            <div className="Game-col">
              <p>
                <b>Save the Princess</b><br/>
                Collect all coins as fast as possible to free the princess.<br/>
                Made with Genius by <a href="https://github.com/NateNjuguna">Nathan Njuguna</a> &copy; 2018
              </p>
            </div>
          </div>
        </div>
        <div className="Game-col">
          <Prison bars={coins.length}/>
          <div className="Game-col Game-stats">
            <h3>Moves Made: {this.state.moveCount}</h3>
            <h3>Coins Left: {coins.length}</h3>
            <p>Time Elapsed: {this.state.time}</p>
            <div className="Game-row">
              <div className="Game-button" onClick={() => this.goBackTo(this.state.moveCount - 1)}>
                <img src={back} alt="go back"/>
                <p>Go Back</p>
              </div>
              <div className="Game-button" onClick={() => this.goBackTo(0)}>
                <img src={refresh} alt="reset game"/>
                <p>Reset Game</p>
              </div>
              <div className="Game-button" onClick={() => this.newGame()}>
                <img src={newGame} alt="new game"/>
                <p>New Game</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  tickTock () {
    this.timeInSeconds++;
    const time = {
      h: parseInt(this.timeInSeconds / 3600, 10),
      m: parseInt((this.timeInSeconds % 3600) / 60, 10),
      s: this.timeInSeconds % 60
    };
    this.setState({
      time: (time.h > 9 ? time.h : '0' + time.h) + ':' + (time.m > 9 ? time.m : '0' + time.m)  + ':' + (time.s > 9 ? time.s : '0' + time.s)
    });
  }
}

export default Game;
