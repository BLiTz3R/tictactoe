import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const className = 'square' + (props.highlight ? ' highlight' : '');
    return (
      <button 
        className={className} 
        onClick={props.onClick}>
        {props.value}
      </button>
    );
}
  
class Board extends React.Component {
  renderSquare(i) {
    const winSquares = this.props.winSquares;
    return (
    <Square 
      key={i} //prevent warning
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} 
      highlight={winSquares && winSquares.includes(i)}
    />
    );
  }
  
  render() {
    const row = [];
    let k = 0; //key
    for (let i = 0; i < 3; i++) {
      const col = [];
      for (let j = 0; j < 3; j++) {
        col.push(this.renderSquare(3 * i + j)); //push argument without {}, <>
        k++;
      }
      row.push(<div key={k} className="board-row">{col}</div>);
    }
    return (
      <div>
        {row}
      </div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
      };
    }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
        return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
        xIsNext: !this.state.xIsNext
    });
}

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const winPlayer = winner.winner;
   
    let moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Restart game';
      if (move === 0) {
      return (
        <li key={move}>
          <button className="btn btn-danger btn-flat" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      ); 
      } else { 
      return (
        <li key={move}>
          <button className="btn btn-primary btn-flat" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      ) 
    }
    });

    let status;
    if (winPlayer) {
      status = 'Winner: ' + winPlayer;
    } else if (winner.isDraw) {
      status = 'DRAW!';
     } else {
       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
     }
    

    return (
      <div className="game">
        <div className="game-board">
          <div className="next">{status}</div>
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winSquares={winner.line}
          />

        </div>
        <div className="game-info">
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}
  
  // ========================================
  
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
        isDraw: false
      };
    }
  }

  let isDraw = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      isDraw = false;
      break;
    }
  }
  return {
    winner: null,
    line: null,
    isDraw: isDraw
  };
}