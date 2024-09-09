import React, { useState } from 'react';
import axios from 'axios';

function SummonerInfo() {
  const [summonerName, setSummonerName] = useState('');
  const [server, setServer] = useState('eun1'); // Default server
  const [summoner, setSummoner] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiKey = process.env.REACT_APP_RIOT_API_KEY;
    try {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Summoner Name:
          <input
            type="text"
            value={summonerName}
            onChange={(e) => setSummonerName(e.target.value)}
            required
          />
        </label>
        <label>
          Server:
          <select value={server} onChange={(e) => setServer(e.target.value)}>
            <option value="eun1">EUNE</option>
            <option value="euw1">EUW</option>
            <option value="na1">NA</option>
            <option value="kr">KR</option>
            {/* Add more servers as needed */}
          </select>
        </label>
        <button type="submit">Get Summoner Info</button>
      </form>

      {summoner && (
        <div>
          <h2>{summoner.name}</h2>
          <p>Level: {summoner.summonerLevel}</p>
          <p>Profile Icon ID: {summoner.profileIconId}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SummonerInfo;
