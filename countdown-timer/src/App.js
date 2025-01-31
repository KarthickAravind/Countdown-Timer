import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [secondsInput, setSecondsInput] = useState(0); // New state for seconds input
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
    const totalSeconds = minutes * 60 + secondsInput; // Calculate total seconds
    if (totalSeconds >= 60) { // Ensure minimum of 60 seconds
      setTimeLeft(totalSeconds);
      setIsActive(true);
    } else {
      alert('Please enter a total time of at least 60 seconds.');
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setMinutes(0);
    setSecondsInput(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div>
        <label>
          Set Timer (minutes):
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
            disabled={isActive}
          />
        </label>
      </div>
      <div>
        <label>
          Set Timer (seconds):
          <input
            type="number"
            value={secondsInput}
            onChange={(e) => setSecondsInput(parseInt(e.target.value, 10))}
            disabled={isActive}
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