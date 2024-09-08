import React from 'react';
import Leaderboard from './leaderboard';

function App() {
  const players = [
    { name: 'Player 1', score: 1500 },
    { name: 'Player 2', score: 1400 },
    { name: 'Player 3', score: 1300 }
  ];

  return (
    <div>
      <h1>LOL Leaderboard</h1>
      <Leaderboard players={players} />
    </div>
  );
}

export default App;
