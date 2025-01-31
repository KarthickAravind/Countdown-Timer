import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
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
    if (minutes > 0) {
      setTimeLeft(minutes * 60);
      setIsActive(true);
    } else {
      alert('Please enter a valid number of minutes.');
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setMinutes(0);
    setSeconds(0);
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