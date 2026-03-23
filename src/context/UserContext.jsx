import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: '',
    avatar: 'explorer1.png',
    score: 0,
    gamesPlayed: 0,
    rank: 0
  });

  const [currentScreen, setCurrentScreen] = useState('start');
  const [selectedLevel, setSelectedLevel] = useState(null);

  const updateUser = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  const createUser = async (name) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      if (data.success) {
        setUser(prev => ({ ...prev, id: data.userId, name }));
        return data.userId;
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const selectAvatar = async (avatar) => {
    if (user.id) {
      try {
        await fetch('/api/select-avatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, avatar })
        });
      } catch (error) {
        console.error('Error selecting avatar:', error);
      }
    }
    setUser(prev => ({ ...prev, avatar }));
  };

  const refreshUserData = async () => {
    if (user.id) {
      try {
        const response = await fetch(`/api/profile/${user.id}`);
        const data = await response.json();
        if (data.success) {
          setUser(prev => ({
            ...prev,
            score: data.profile.score,
            gamesPlayed: data.profile.games_played,
            rank: data.profile.rank
          }));
        }
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      createUser,
      selectAvatar,
      refreshUserData,
      currentScreen,
      setCurrentScreen,
      selectedLevel,
      setSelectedLevel
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
