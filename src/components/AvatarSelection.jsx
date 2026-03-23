import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const avatars = [
  { id: 'avatar1', name: 'Alex', type: 'blonde-boy' },
  { id: 'avatar2', name: 'Mia', type: 'brunette-girl' },
  { id: 'avatar3', name: 'Leo', type: 'gamer-boy' },
  { id: 'avatar4', name: 'Zoe', type: 'glasses-girl' },
  { id: 'avatar5', name: 'Max', type: 'cap-boy' },
  { id: 'avatar6', name: 'Amy', type: 'short-hair-girl' },
  { id: 'avatar7', name: 'Sam', type: 'hijab-girl' },
  { id: 'avatar8', name: 'Eva', type: 'hood-girl' },
  { id: 'avatar9', name: 'Dex', type: 'nerd-boy' },
  { id: 'avatar10', name: 'Kit', type: 'raccoon' },
  { id: 'avatar11', name: 'Panda', type: 'panda-boy' },
  { id: 'avatar12', name: 'Robo', type: 'robot' }
];

const AvatarSelection = () => {
  const { selectAvatar, setCurrentScreen, user } = useUser();
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
  };

  const handleConfirm = async () => {
    if (selectedAvatar) {
      await selectAvatar(`${selectedAvatar}.png`);
      setCurrentScreen('level');
    }
  };

  const getAvatarFace = (type) => {
    switch(type) {
      case 'blonde-boy':
        return { hair: '#FFD700', skin: '#F5D0C5', shirt: '#E53935', feature: 'blonde' };
      case 'brunette-girl':
        return { hair: '#4A3728', skin: '#F5D0C5', shirt: '#E91E63', feature: 'headband' };
      case 'gamer-boy':
        return { hair: '#333', skin: '#F5D0C5', shirt: '#1976D2', feature: 'headphones' };
      case 'glasses-girl':
        return { hair: '#B71C1C', skin: '#F5D0C5', shirt: '#9C27B0', feature: 'glasses' };
      case 'cap-boy':
        return { hair: '#5D4037', skin: '#F5D0C5', shirt: '#FF5722', feature: 'cap' };
      case 'short-hair-girl':
        return { hair: '#3E2723', skin: '#F5D0C5', shirt: '#FF9800', feature: 'short' };
      case 'hijab-girl':
        return { hair: '#6A1B9A', skin: '#F5D0C5', shirt: '#AB47BC', feature: 'hijab' };
      case 'hood-girl':
        return { hair: '#2E7D32', skin: '#F5D0C5', shirt: '#66BB6A', feature: 'hood' };
      case 'nerd-boy':
        return { hair: '#FFD54F', skin: '#F5D0C5', shirt: '#00BCD4', feature: 'goggles' };
      case 'raccoon':
        return { hair: '#5D4037', skin: '#8D6E63', shirt: '#795548', feature: 'animal' };
      case 'panda-boy':
        return { hair: '#333', skin: '#FFF', shirt: '#9E9E9E', feature: 'panda' };
      case 'robot':
        return { hair: '#607D8B', skin: '#B0BEC5', shirt: '#455A64', feature: 'robot' };
      default:
        return { hair: '#8B4513', skin: '#F5D0C5', shirt: '#4A90D2', feature: 'none' };
    }
  };

  return (
    <div className="screen avatar-select-screen">
      {/* Background decorations */}
      <div className="fantasy-bg">
        <div className="pyramid-silhouette left"></div>
        <div className="pyramid-silhouette center"></div>
        <div className="pyramid-silhouette right"></div>
        <div className="crystal left-crystal"></div>
        <div className="crystal right-crystal"></div>
        <div className="torch left-torch"></div>
        <div className="torch right-torch"></div>
      </div>

      {/* Curved Banner Header */}
      <div className="banner-header">
        <div className="banner-curve">
          <h1>Select Your Avatar</h1>
        </div>
      </div>

      {/* Avatar Grid - 3 rows x 4 columns */}
      <div className="avatar-grid-container">
        {avatars.map((avatar) => {
          const colors = getAvatarFace(avatar.type);
          const isSelected = selectedAvatar === avatar.id;
          
          return (
            <div
              key={avatar.id}
              className={`avatar-slot ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(avatar.id)}
            >
              <div className="avatar-frame">
                <div className="avatar-character" style={{ background: colors.skin }}>
                  {/* Hair */}
                  <div className="char-hair" style={{ background: colors.hair }}></div>
                  
                  {/* Special features */}
                  {colors.feature === 'headphones' && (
                    <div className="feature-headphones"></div>
                  )}
                  {colors.feature === 'glasses' && (
                    <div className="feature-glasses"></div>
                  )}
                  {colors.feature === 'cap' && (
                    <div className="feature-cap" style={{ background: colors.shirt }}></div>
                  )}
                  {colors.feature === 'hijab' && (
                    <div className="feature-hijab" style={{ background: colors.hair }}></div>
                  )}
                  {colors.feature === 'hood' && (
                    <div className="feature-hood" style={{ background: colors.hair }}></div>
                  )}
                  {colors.feature === 'goggles' && (
                    <div className="feature-goggles"></div>
                  )}
                  {colors.feature === 'animal' && (
                    <div className="feature-animal-mask"></div>
                  )}
                  {colors.feature === 'panda' && (
                    <div className="feature-panda-mask"></div>
                  )}
                  {colors.feature === 'robot' && (
                    <div className="feature-robot-eyes"></div>
                  )}
                  
                  {/* Eyes */}
                  <div className="char-eyes">
                    <div className="char-eye"></div>
                    <div className="char-eye"></div>
                  </div>
                  
                  {/* Smile */}
                  <div className="char-smile"></div>
                </div>
                
                {/* Shirt */}
                <div className="char-shirt" style={{ background: colors.shirt }}></div>
              </div>
              
              {/* Selection glow effect */}
              {isSelected && <div className="selection-glow"></div>}
            </div>
          );
        })}
      </div>

      {/* Footer with Confirm Button */}
      <div className="avatar-footer">
        <p className="choose-text">Choose your character!</p>
        <button 
          className={`confirm-btn ${selectedAvatar ? 'active' : ''}`}
          onClick={handleConfirm}
          disabled={!selectedAvatar}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AvatarSelection;
