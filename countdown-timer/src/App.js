import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [timeInput, setTimeInput] = useState('0:00'); // Input in MM:SS format
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(interval);
      setIsActive(false);
      alert('Timer has ended!');
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    // Validate input format (MM:SS)
    const timePattern = /^(\d{1,2}):([0-5]\d)$/; // Matches MM:SS format
    if (!timePattern.test(timeInput)) {
      alert('Please enter time in MM:SS format (e.g., 0:30 or 1:30).');
      return;
    }

    // Split input into minutes and seconds
    const [minutes, seconds] = timeInput.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0) {
      alert('Please enter a valid time greater than 0 seconds.');
      return;
    }

    setTimeLeft(totalSeconds);
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setTimeInput('0:00');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div>
        <label>
          Set Timer (MM:SS):
          <input
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            disabled={isActive}
            placeholder="MM:SS"
          />
        </label>
      </div>
      <div>
        <button onClick={handleStart} disabled={isActive}>
          Start
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <h2>{formatTime(timeLeft)}</h2>
      </div>
    </div>
  );
}

export default App;