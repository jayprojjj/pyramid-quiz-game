import React from 'react';
import { useUser } from '../context/UserContext';

const levels = [
  { 
    id: 'easy', 
    name: 'Explorer Initiate', 
    subtitle: 'Beginner',
    points: 10,
    color: '#4a90d9',
    description: 'Start your journey with basic pyramid calculations'
  },
  { 
    id: 'medium', 
    name: 'Desert Navigator', 
    subtitle: 'Intermediate',
    points: 20,
    color: '#d4a84b',
    description: 'Challenge yourself with medium difficulty problems'
  },
  { 
    id: 'hard', 
    name: 'Pyramid Master', 
    subtitle: 'Advanced',
    points: 30,
    color: '#8b4513',
    description: 'Master the most complex pyramid calculations'
  }
];

const LevelSelect = () => {
  const { setSelectedLevel, setCurrentScreen, user } = useUser();

  const handleSelect = (levelId) => {
    setSelectedLevel(levelId);
    setCurrentScreen('game');
  };

  return (
    <div className="screen level-screen">
      <div className="screen-header">
        <h2>Choose Your Level!</h2>
        <p>Select difficulty to begin your adventure</p>
      </div>

      <div className="levels-container">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`level-card level-${level.id}`}
            onClick={() => handleSelect(level.id)}
            style={{ '--level-color': level.color }}
          >
            <div className="level-avatar">
              <div className={`level-icon ${level.id}`}>
                <span>{level.name[0]}</span>
              </div>
            </div>
            <div className="level-info">
              <h3>{level.name}</h3>
              <span className="level-badge">{level.subtitle}</span>
              <p className="level-description">{level.description}</p>
              <div className="level-points">{level.points} Points per question</div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-back" onClick={() => setCurrentScreen('avatar')}>
        Back
      </button>
    </div>
  );
};

export default LevelSelect;
