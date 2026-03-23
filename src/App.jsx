// client/src/App.jsx
import React, { useEffect, useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import StartScreen from './components/StartScreen';
import AvatarSelection from './components/AvatarSelection';
import LevelSelect from './components/LevelSelect';
import Game from './components/Game';
import Feedback from './components/Feedback';
import Leaderboard from './components/Leaderboard';
import ProfilePage from './components/ProfilePage';
import BackgroundMusic from './components/BackgroundMusic';

// Import API URL from .env via a small helper file
import { API } from './api'; // <-- create api.js in src folder with export const API = import.meta.env.VITE_API_URL;

const GameContainer = () => {
  const { currentScreen } = useUser();
  const [quizData, setQuizData] = useState(null); // Example state to fetch from backend

  // Fetch some example data from your backend
  const fetchQuizData = async () => {
    try {
      const res = await fetch(`${API}/quiz`); // Replace '/quiz' with your actual endpoint
      const data = await res.json();
      setQuizData(data);
      console.log('Quiz data:', data);
    } catch (err) {
      console.error('Error fetching quiz data:', err);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen quizData={quizData} />;
      case 'avatar':
        return <AvatarSelection />;
      case 'level':
        return <LevelSelect />;
      case 'game':
        return <Game quizData={quizData} />;
      case 'feedback':
        return <Feedback />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <StartScreen quizData={quizData} />;
    }
  };

  return (
    <div className="app-container">
      <BackgroundMusic />
      {renderScreen()}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <GameContainer />
    </UserProvider>
  );
}

export default App;