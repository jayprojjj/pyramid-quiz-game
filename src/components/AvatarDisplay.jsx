import React from 'react';

const avatarStyles = {
  'avatar1.png': { hair: '#FFD700', skin: '#F5D0C5', shirt: '#E53935', feature: 'blonde' },
  'avatar2.png': { hair: '#4A3728', skin: '#F5D0C5', shirt: '#E91E63', feature: 'headband' },
  'avatar3.png': { hair: '#333', skin: '#F5D0C5', shirt: '#1976D2', feature: 'headphones' },
  'avatar4.png': { hair: '#B71C1C', skin: '#F5D0C5', shirt: '#9C27B0', feature: 'glasses' },
  'avatar5.png': { hair: '#5D4037', skin: '#F5D0C5', shirt: '#FF5722', feature: 'cap' },
  'avatar6.png': { hair: '#3E2723', skin: '#F5D0C5', shirt: '#FF9800', feature: 'short' },
  'avatar7.png': { hair: '#6A1B9A', skin: '#F5D0C5', shirt: '#AB47BC', feature: 'hijab' },
  'avatar8.png': { hair: '#2E7D32', skin: '#F5D0C5', shirt: '#66BB6A', feature: 'hood' },
  'avatar9.png': { hair: '#FFD54F', skin: '#F5D0C5', shirt: '#00BCD4', feature: 'goggles' },
  'avatar10.png': { hair: '#5D4037', skin: '#8D6E63', shirt: '#795548', feature: 'animal' },
  'avatar11.png': { hair: '#333', skin: '#FFF', shirt: '#9E9E9E', feature: 'panda' },
  'avatar12.png': { hair: '#607D8B', skin: '#B0BEC5', shirt: '#455A64', feature: 'robot' },
};

const AvatarDisplay = ({ avatar, size = 'small' }) => {
  const colors = avatarStyles[avatar] || avatarStyles['avatar1.png'];
  
  const sizeClass = size === 'small' ? 'avatar-display-small' : 'avatar-display-large';
  
  return (
    <div className={`avatar-display ${sizeClass}`}>
      <div className="mini-avatar" style={{ background: colors.skin }}>
        {/* Hair */}
        <div className="mini-hair" style={{ background: colors.hair }}></div>
        
        {/* Special features */}
        {colors.feature === 'headphones' && (
          <div className="mini-headphones"></div>
        )}
        {colors.feature === 'glasses' && (
          <div className="mini-glasses"></div>
        )}
        {colors.feature === 'cap' && (
          <div className="mini-cap" style={{ background: colors.shirt }}></div>
        )}
        {colors.feature === 'hijab' && (
          <div className="mini-hijab" style={{ background: colors.hair }}></div>
        )}
        {colors.feature === 'hood' && (
          <div className="mini-hood" style={{ background: colors.hair }}></div>
        )}
        {colors.feature === 'goggles' && (
          <div className="mini-goggles"></div>
        )}
        {colors.feature === 'animal' && (
          <div className="mini-animal-mask"></div>
        )}
        {colors.feature === 'panda' && (
          <div className="mini-panda-mask"></div>
        )}
        {colors.feature === 'robot' && (
          <div className="mini-robot-eyes"></div>
        )}
        
        {/* Eyes */}
        <div className="mini-eyes">
          <div className="mini-eye"></div>
          <div className="mini-eye"></div>
        </div>
        
        {/* Smile */}
        <div className="mini-smile"></div>
      </div>
      
      {/* Shirt */}
      <div className="mini-shirt" style={{ background: colors.shirt }}></div>
    </div>
  );
};

export default AvatarDisplay;
