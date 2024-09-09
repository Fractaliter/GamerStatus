import React, { useState, useEffect } from 'react';
import Leaderboard from './leaderboard'; // Ensure this is your leaderboard component
import SummonerInfo from './summonerInfo';

function App() {
  const [players, setPlayers] = useState([]);


  return (
    <div>
      <h1>LOL Leaderboard by KW</h1>
      <Leaderboard players={players} />
      <SummonerInfo /> {/* Render the form and summoner info component */}
    </div>
  );
}

export default App;
