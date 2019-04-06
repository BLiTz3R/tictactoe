import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return (
    <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} 
    />
    );
  }
  
  render() {
    return (
      <table id="board">
        <tbody>
          <tr>
            <td>{this.renderSquare(0)}</td>
            <td>{this.renderSquare(1)}</td>
            <td>{this.renderSquare(2)}</td>
          </tr>
          <tr>
            <td>{this.renderSquare(3)}</td>
            <td>{this.renderSquare(4)}</td>
            <td>{this.renderSquare(5)}</td>
          </tr>
          <tr>
            <td>{this.renderSquare(6)}</td>
            <td>{this.renderSquare(7)}</td>
            <td>{this.renderSquare(8)}</td>
          </tr>
        </tbody>
      </table>
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
    if (calculateWinner(squares) || squares[i]) {
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

    const moves = history.map((step, move) => {
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
    if (winner) {
      status = 'Winner: ' + winner;
     // const winningSquares = current.squares; // TODO highlight winning squares
    } else if (current.squares.includes(null)) {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
     } else {
       status = 'DRAW!';
     }
    

    return (
      <div className="game">
        <div className="game-board">
          <div className="next">{status}</div>
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
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
      return squares[a];
    }
  }
  return null;
}