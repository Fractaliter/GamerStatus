import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

function SummonerInfo() {
  const [summonerName, setSummonerName] = useState('');
  const [server, setServer] = useState('eun1');
  const [summoner, setSummoner] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiKey = process.env.REACT_APP_RIOT_API_KEY;
      const response = await axios.get(`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}?api_key=${apiKey}`);
      setSummoner(response.data);
      setError(null);
    } catch (error) {
      setSummoner(null);
      if (error.response) {
        setError(`Error: ${error.response.status} - ${error.response.data.status.message}`);
      } else {
        setError('Error fetching summoner info. Please check the summoner name or server.');
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Summoner Name"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Server"
        value={server}
        onChange={(e) => setServer(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="eun1">EUNE</MenuItem>
        <MenuItem value="euw1">EUW</MenuItem>
        <MenuItem value="na1">NA</MenuItem>
        <MenuItem value="kr">KR</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Get Summoner Info
      </Button>

      {summoner && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Summoner Info</Typography>
          <Typography>Name: {summoner.name}</Typography>
          <Typography>Level: {summoner.summonerLevel}</Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default SummonerInfo;
