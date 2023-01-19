import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const newSeconds = seconds % 60;
  const minutes = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(seconds / 3600);
  const formattedSeconds = newSeconds < 10 ? `0${newSeconds}` : newSeconds;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedHours = hours < 10 ? `0${hours}` : hours;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div>
      {formattedHours}:{formattedMinutes}:{formattedSeconds}
    </div>
  );
}

export default Timer;
