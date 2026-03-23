import React from 'react';
import { UserProvider, useUser } from './context/UserContext';
import StartScreen from './components/StartScreen';
import AvatarSelection from './components/AvatarSelection';
import LevelSelect from './components/LevelSelect';
import Game from './components/Game';
import Feedback from './components/Feedback';
import Leaderboard from './components/Leaderboard';
import ProfilePage from './components/ProfilePage';
import BackgroundMusic from './components/BackgroundMusic';

const GameContainer = () => {
  const { currentScreen } = useUser();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen />;
      case 'avatar':
        return <AvatarSelection />;
      case 'level':
        return <LevelSelect />;
      case 'game':
        return <Game />;
      case 'feedback':
        return <Feedback />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <StartScreen />;
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
