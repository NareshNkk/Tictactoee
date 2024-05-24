import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [winner, setWinner] = useState('');
  const [char, setChar] = useState('X');
  const [matrix, setMatrix] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const getBgClass = (value) => {
    if (value === 'X') return 'brown';
    if (value === 'O') return 'brown';
    return '';
  };

  useEffect(() => {
    checkWinner();
  }, [matrix]);

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (matrix[i][0] && matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
        declareWinner(matrix[i][0]);
        return;
      }
      if (matrix[0][i] && matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i]) {
        declareWinner(matrix[0][i]);
        return;
      }
    }
    if (matrix[0][0] && matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
      declareWinner(matrix[0][0]);
      return;
    }

    if (matrix[0][2] && matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
      declareWinner(matrix[0][2]);
      return;
    }
  };

  const declareWinner = (winnerChar) => {
    setWinner(winnerChar + ' is the Winner');
    if (winnerChar === 'X') {
      setPlayer1Score(player1Score + 1);
    } else {
      setPlayer2Score(player2Score + 1);
    }
  };

  const handleClick = (r, c) => {
    if (matrix[r][c] || winner) return;
    const tempMatrix = [...matrix];
    tempMatrix[r][c] = char;
    setMatrix(tempMatrix);
    setChar(char === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setWinner('');
    setMatrix([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setChar('X');
  };

  return (
    <div className='app'>
      <div className='header aligncenter'></div>
      <div className='nav'>
        <a href='#'>Docs</a>
        <a href='#'>Play</a>
        <a href='#'>About Us</a>
      </div>
      <div className='game-container'>
        <div className='card player1'>
          <div className='card-content'>
            Player 1 <br />
            SCORE <br />
            <span className='score'>{player1Score}</span>
          </div>
        </div>
        <div className='board aligncenter'>
          <div className='gameboard'>
            {matrix.map((row, rIndex) => (
              <div className='row' key={rIndex}>
                {row.map((cell, cIndex) => (
                  <div
                    key={cIndex}
                    onClick={() => handleClick(rIndex, cIndex)}
                    className={`cell aligncenter ${getBgClass(matrix[rIndex][cIndex])}`}
                  >
                    {matrix[rIndex][cIndex]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className='card player2'>
          <div className='card-content'>
            Player 2 <br />
            SCORE <br />
            <span className='score'>{player2Score}</span>
          </div>
        </div>
      </div>
      <button onClick={resetGame}>New Game</button>
    </div>
  );
}

export default App;
