import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Leaderboard from './leaderboard';
import SummonerInfo from './summonerInfo';

function App() {
  const [players, setPlayers] = useState([]);


  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          LOL Leaderboard by KW
        </Typography>
        <Typography variant="subtitle1">
          Enter a summoner name to retrieve their rank and stats.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <SummonerInfo />
      </Box>

      <Box>
        <Leaderboard players={players} />
      </Box>
    </Container>
  );
}

export default App;
