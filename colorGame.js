const Board = () => {
  // 1st player is 1
  // State keeps track of next player
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  // check for winner (see superset.js)
  let status = `Winner is ${checkForWinner(gameState)}`;

let playerTurn = `Next Player: ${player == '0' ? 'Player O' : 'Player X'}`;
  
console.log(`We have a winner ${status}`);

const takeTurn = (id) => {
  setGameState([...gameState, { id: id, player: player }]);
  setPlayer((player + 1) % 2); // get next player
  return player;
};

const squares = Array.from({ length: 9 }, (_, i) => (
  <Square takeTurn={takeTurn} id={i} key={i} />
));
return (
  <div className="game-board">
    <div className="grid-row">{squares.slice(0, 3)}</div>
    <div className="grid-row">{squares.slice(3, 6)}</div>
    <div className="grid-row">{squares.slice(6, 9)}</div>
    
    <div id="info">
      <h1 id="turn">{playerTurn}</h1>
      <h1>{status}</h1>
    </div>
  </div>
);
};
const Square = ({ takeTurn, id }) => {
  const mark = ['O', 'X', '+'];
  // id is the square's number
  // filled tells you if square has been filled
  // tik tells you symbol in square (same as player)
  // You call takeTurn to tell Parent that the square has been filled
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);

    return (
    <button
      // Part 2: update the return statement below to add css classes
      className={tik == '1' ? 'red' : 'white'}
      onClick={() => {
        setTik(takeTurn(id));
        setFilled(true);
        console.log(`Square: ${id} filled by player : ${tik}`);
      }}
    >
      <h1>{mark[tik]}</h1>
    </button>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};
// Checking for Winner takes a bit of work
// We use JavaScript Sets to check players choices
// against winning combinations
// Online there is more compact version but I prefer this one

const win = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],             // Diagonals
];

const checkForWinner = (gameState) => {
  if (gameState.length < 5) return "No Winner Yet";

  const playerMoves = gameState.reduce((acc, item) => {
    acc[item.player] = (acc[item.player] || []).concat(item.id);
    return acc;
  }, {});

  const hasWinner = player => win.some(line => line.every(position => playerMoves[player].includes(position)));

  return hasWinner(0) ? "Player O " : hasWinner(1) ? "Player X " : "No Winner Yet";
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
