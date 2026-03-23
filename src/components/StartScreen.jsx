import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const StartScreen = () => {
  const { createUser, updateUser, setCurrentScreen } = useUser();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [existingUser, setExistingUser] = useState(null);

  const handleStart = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setError('');
    setExistingUser(null);
    
    // Check if username already exists
    try {
      const response = await fetch(`/api/check-username/${encodeURIComponent(name)}`);
      const data = await response.json();
      
      if (data.success && data.exists) {
        // Username exists - show option to continue with existing user
        setExistingUser({
          userId: data.userId,
          name: name
        });
        return;
      }
    } catch (error) {
      console.error('Error checking username:', error);
    }
    
    // Create new user
    const userId = await createUser(name);
    if (userId) {
      setCurrentScreen('avatar');
    }
  };

  const handleContinueWithExisting = async () => {
    // Fetch existing user data and continue
    try {
      const response = await fetch(`/api/profile/${existingUser.userId}`);
      const data = await response.json();
      
      if (data.success) {
        updateUser({
          id: data.profile.id,
          name: data.profile.name,
          avatar: data.profile.avatar,
          score: data.profile.score,
          gamesPlayed: data.profile.games_played,
          rank: data.profile.rank
        });
        setCurrentScreen('level');
      }
    } catch (error) {
      console.error('Error fetching existing user:', error);
      setError('Error loading user data');
    }
  };

  const handleCancelExisting = () => {
    setExistingUser(null);
    setName('');
  };

  return (
    <div className="screen start-screen">
      <div className="game-title">
        <h1>PYRAMID EXPLORER</h1>
        <h2>ADVENTURE</h2>
      </div>
      
      <div className="pyramid-decoration">
        <div className="pyramid-icon"></div>
      </div>

      <div className="start-form">
        {!existingUser ? (
          <>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="name-input"
              maxLength={20}
            />
            {error && <p className="error-text">{error}</p>}
            
            <button className="btn btn-primary btn-large" onClick={handleStart}>
              Start Adventure
            </button>
            
            <button 
              className="btn btn-secondary" 
              onClick={() => setCurrentScreen('leaderboard')}
            >
              Top Explorers
            </button>
          </>
        ) : (
          <div className="existing-user-dialog">
            <h3>Welcome Back!</h3>
            <p>The username <strong>"{existingUser.name}"</strong> already exists.</p>
            <p>Would you like to continue with your existing profile?</p>
            
            <div className="existing-user-actions">
              <button className="btn btn-primary" onClick={handleContinueWithExisting}>
                Continue with Existing
              </button>
              <button className="btn btn-secondary" onClick={handleCancelExisting}>
                Choose Different Name
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="desert-decoration bottom">
        <div className="sand-dunes"></div>
      </div>
    </div>
  );
};

export default StartScreen;
