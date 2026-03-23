import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import AvatarDisplay from './AvatarDisplay';

const avatars = [
  { id: 'avatar1', name: 'Alex' },
  { id: 'avatar2', name: 'Mia' },
  { id: 'avatar3', name: 'Leo' },
  { id: 'avatar4', name: 'Zoe' },
  { id: 'avatar5', name: 'Max' },
  { id: 'avatar6', name: 'Amy' },
  { id: 'avatar7', name: 'Sam' },
  { id: 'avatar8', name: 'Eva' },
  { id: 'avatar9', name: 'Dex' },
  { id: 'avatar10', name: 'Kit' },
  { id: 'avatar11', name: 'Panda' },
  { id: 'avatar12', name: 'Robo' }
];

const ProfilePage = () => {
  const { user, setCurrentScreen, selectAvatar } = useUser();
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [showAvatarSelect, setShowAvatarSelect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.id) {
      fetchProfile();
      fetchHistory();
    }
  }, [user.id]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("https://your-backend-url.up.railway.app/api/questions");
      const data = await response.json();
      if (data.success) {
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch("https://your-backend-url.up.railway.app/api/questions");
      const data = await response.json();
      if (data.success) {
        setHistory(data.history);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleAvatarChange = async (avatarId) => {
    await selectAvatar(`${avatarId}.png`);
    setShowAvatarSelect(false);
    fetchProfile();
  };

  const getRankTitle = (rank) => {
    if (rank === 1) return 'Pyramid Master';
    if (rank === 2) return 'Desert Navigator';
    if (rank === 3) return 'Explorer Initiate';
    return 'Adventurer';
  };

  if (loading) {
    return (
      <div className="screen profile-screen">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="screen profile-screen">
      <div className="screen-header">
        <h2>Explorer Profile</h2>
      </div>

      <div className="profile-card">
        <div className="profile-avatar-section">
          <div className="profile-avatar-large" onClick={() => setShowAvatarSelect(true)}>
            <AvatarDisplay avatar={user.avatar} size="large" />
            <div className="change-avatar-hint">Change</div>
          </div>
          <h3 className="profile-name">{user.name}</h3>
          <span className="profile-rank">{getRankTitle(user.rank)}</span>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{user.score}</span>
            <span className="stat-label">Total Score</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.rank}</span>
            <span className="stat-label">Current Rank</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user.gamesPlayed}</span>
            <span className="stat-label">Games Played</span>
          </div>
        </div>
      </div>

      {profile?.performance && profile.performance.length > 0 && (
        <div className="performance-section">
          <h4>Performance by Difficulty</h4>
          <div className="performance-grid">
            {profile.performance.map((perf) => (
              <div key={perf.level} className={`performance-card ${perf.level}`}>
                <span className="perf-level">{perf.level}</span>
                <span className="perf-games">{perf.games_played} games</span>
                <span className="perf-avg">Avg: {Math.round(perf.avg_score)} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h4>Recent Games</h4>
          <div className="history-list">
            {history.slice(0, 5).map((game, index) => (
              <div key={index} className="history-item">
                <span className="history-level">{game.level}</span>
                <span className="history-score">+{game.score} pts</span>
                <span className="history-date">
                  {new Date(game.date_played).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="profile-actions">
        <button className="btn btn-primary" onClick={() => setCurrentScreen('level')}>
          Play Game
        </button>
        <button className="btn btn-secondary" onClick={() => setCurrentScreen('leaderboard')}>
          Leaderboard
        </button>
        <button className="btn btn-tertiary" onClick={() => setCurrentScreen('start')}>
          Exit
        </button>
      </div>

      {showAvatarSelect && (
        <div className="avatar-modal">
          <div className="avatar-modal-content">
            <h4>Select New Avatar</h4>
            <div className="avatar-grid-small">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className="avatar-option"
                  onClick={() => handleAvatarChange(avatar.id)}
                >
                  <AvatarDisplay avatar={`${avatar.id}.png`} size="small" />
                  <small>{avatar.name}</small>
                </div>
              ))}
            </div>
            <button className="btn btn-close" onClick={() => setShowAvatarSelect(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
