import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const Leaderboard = () => {
  const { setCurrentScreen, user } = useUser();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("https://your-backend-url.up.railway.app/api/questions");
      const data = await response.json();
      if (data.success) {
        setLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
    setLoading(false);
  };

  const getRankTitle = (rank) => {
    if (rank === 1) return 'Pyramid Master';
    if (rank === 2) return 'Desert Navigator';
    if (rank === 3) return 'Explorer Initiate';
    return 'Adventurer';
  };

  if (loading) {
    return (
      <div className="screen leaderboard-screen">
        <div className="loading">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="screen leaderboard-screen">
      <div className="screen-header">
        <h2>Leaderboard</h2>
        <p>Top Pyramid Explorers</p>
      </div>

      {user.id && (
        <div className="your-rank-banner">
          <div className="trophy-icon">🏆</div>
          <div className="rank-info">
            <span className="rank-title">Your Rank: {getRankTitle(user.rank)}</span>
            <span className="rank-score">Score: {user.score}</span>
          </div>
        </div>
      )}

      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <span className="rank-col">Rank</span>
          <span className="avatar-col"></span>
          <span className="name-col">Explorer</span>
          <span className="score-col">Score</span>
        </div>

        <div className="leaderboard-list">
          {leaderboard.map((player, index) => (
            <div 
              key={player.id} 
              className={`leaderboard-row ${player.id === user.id ? 'current-user' : ''} rank-${index + 1}`}
            >
              <span className="rank-col">
                {index === 0 && <span className="medal gold">🥇</span>}
                {index === 1 && <span className="medal silver">🥈</span>}
                {index === 2 && <span className="medal bronze">🥉</span>}
                {index > 2 && <span className="rank-number">{index + 1}</span>}
              </span>
              <span className="avatar-col">
                <div className="avatar-small">
                  <span>{player.name[0]}</span>
                </div>
              </span>
              <span className="name-col">{player.name}</span>
              <span className="score-col">{player.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="leaderboard-actions">
        <button className="btn btn-primary" onClick={() => setCurrentScreen('start')}>
          Continue
        </button>
        {user.id && (
          <button className="btn btn-secondary" onClick={() => setCurrentScreen('profile')}>
            View Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
