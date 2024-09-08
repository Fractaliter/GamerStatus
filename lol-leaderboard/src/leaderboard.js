import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const API_KEY = 'RGAPI-dd60300a-e42a-4518-be62-efdba36adc38';  // Replace with your actual API key

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
  
    useEffect(() => {
      const fetchPlayers = async () => {
        try {
          // Fetch the challenger league data
          const response = await axios.get(
            `https://eun1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`
          );
          const entries = response.data.entries;
          
          const topEntries = entries.slice(0, 5);
          // Fetch summoner names for each entry
          const playerData = await Promise.all(topEntries.map(async (player) => {
            const summonerResponse = await axios.get(
              `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/${player.summonerId}?api_key=${API_KEY}`
            );
            return {
                summonerId: player.summonerId,
              score: player.leaguePoints,
            };
          }));
  
          setPlayers(playerData);
        } catch (error) {
          console.error('Error fetching data:', error.response ? error.response.data : error.message);
        }
      };
  
      fetchPlayers();
    }, []);
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>SummonerId</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.summonerId}</TableCell>
                <TableCell>{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default Leaderboard;