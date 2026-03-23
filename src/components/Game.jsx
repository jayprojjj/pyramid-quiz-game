import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Pyramid3D from './Pyramid3D';
import AvatarDisplay from './AvatarDisplay';

const Game = () => {
  const { user, selectedLevel, setCurrentScreen } = useUser();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestion();
  }, [selectedLevel]);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://your-backend-url.up.railway.app/api/questions");
      const data = await response.json();
      if (data.success && data.question) {
        setQuestion(data.question);
      } else {
        setError('No questions available for this level');
      }
    } catch (err) {
      setError('Failed to load question');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError('Please enter an answer');
      return;
    }

    try {
      const response = await fetch('/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          questionId: question.id,
          userAnswer: parseFloat(answer),
          level: selectedLevel
        })
      });

      const data = await response.json();
      if (data.success) {
        setCurrentScreen('feedback');
        // Store feedback data in session storage for feedback screen
        sessionStorage.setItem('feedback', JSON.stringify({
          isCorrect: data.isCorrect,
          correctAnswer: data.correctAnswer,
          points: data.points,
          solution: question.solution,
          userAnswer: answer
        }));
      }
    } catch (err) {
      setError('Failed to submit answer');
    }
  };

  if (loading) {
    return (
      <div className="screen game-screen">
        <div className="loading">Loading question...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen game-screen">
        <div className="error">{error}</div>
        <button className="btn" onClick={() => setCurrentScreen('level')}>
          Back to Levels
        </button>
      </div>
    );
  }

  return (
    <div className="screen game-screen">
      <div className="game-header">
        <div className="user-info">
          <div className="user-avatar-small" onClick={() => setCurrentScreen('profile')}>
            <AvatarDisplay avatar={user.avatar} size="small" />
          </div>
          <span className="user-name">{user.name}</span>
        </div>
        <div className="score-display">
          Score: {user.score}
        </div>
      </div>

      <div className="game-content">
        <div className="question-panel">
          <h3>Find the Volume of the Pyramid</h3>
          <p className="question-text">{question.question_text}</p>
          
          <div className="dimensions-display">
            <div className="dimension">
              <span className="label">Base:</span>
              <span className="value">{question.base} cm</span>
            </div>
            <div className="dimension">
              <span className="label">Height:</span>
              <span className="value">{question.height} cm</span>
            </div>
          </div>
        </div>

        <div className="pyramid-panel">
          <Pyramid3D 
            base={question.base} 
            height={question.height} 
            showDimensions={true}
          />
        </div>

        <div className="answer-panel">
          <label>What is the volume of the pyramid?</label>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="answer-input"
            step="0.01"
          />
          <span className="unit">cm³</span>
          
          {error && <p className="error-text">{error}</p>}
          
          <button className="btn btn-submit" onClick={handleSubmit}>
            Submit Answer
          </button>
        </div>
      </div>

      <button className="btn btn-exit" onClick={() => setCurrentScreen('level')}>
        Exit Game
      </button>
    </div>
  );
};

export default Game;
