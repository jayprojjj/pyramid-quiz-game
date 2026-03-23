import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const Feedback = () => {
  const { setCurrentScreen, refreshUserData } = useUser();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const storedFeedback = sessionStorage.getItem('feedback');
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
      refreshUserData();
    }
  }, []);

  if (!feedback) {
    return (
      <div className="screen feedback-screen">
        <div className="loading">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className={`screen feedback-screen ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
      <div className="feedback-header">
        <h2>{feedback.isCorrect ? 'Correct!' : 'Incorrect!'}</h2>
        <div className={`feedback-icon ${feedback.isCorrect ? 'check' : 'cross'}`}>
          {feedback.isCorrect ? '✓' : '✗'}
        </div>
      </div>

      <div className="feedback-content">
        <p className="feedback-message">
          {feedback.isCorrect 
            ? 'Great job! Here\'s the solution:' 
            : 'Don\'t worry! Here\'s the correct solution:'}
        </p>

        <div className="solution-box">
          <h4>Step-by-Step Solution:</h4>
          <pre className="solution-text">{feedback.solution}</pre>
        </div>

        <div className="answer-comparison">
          <div className="your-answer">
            <span>Your Answer:</span>
            <span className={feedback.isCorrect ? 'correct-text' : 'incorrect-text'}>
              {feedback.userAnswer} cm³
            </span>
          </div>
          <div className="correct-answer">
            <span>Correct Answer:</span>
            <span className="correct-text">{feedback.correctAnswer} cm³</span>
          </div>
        </div>

        {feedback.isCorrect && (
          <div className="points-earned">
            <span className="points-label">Well Done!</span>
            <span className="points-value">+{feedback.points} Points</span>
          </div>
        )}
      </div>

      <div className="feedback-actions">
        <button className="btn btn-primary" onClick={() => setCurrentScreen('game')}>
          Next Question
        </button>
        <button className="btn btn-secondary" onClick={() => setCurrentScreen('level')}>
          Change Level
        </button>
        <button className="btn btn-tertiary" onClick={() => setCurrentScreen('leaderboard')}>
          View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Feedback;
