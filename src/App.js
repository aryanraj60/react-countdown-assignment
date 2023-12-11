import logo from "./logo.svg";
import { FaPlay } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { IoPause } from "react-icons/io5";

//Funtion to format total Seconds into hours, minutes, seconds

const formatDisplayTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
};

function App() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let timerInterval;

    if (isStarted) {
      timerInterval = setInterval(() => {
        // console.log("callback running");
        if (totalSeconds !== 0) {
          setTotalSeconds((prevSecs) => prevSecs - 1);
        } else {
          clearInterval(timerInterval);
          setIsStarted(false);
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isStarted, totalSeconds]);

  const handleTimerStart = () => {
    setIsStarted(true);
  };

  const handleTimerPause = () => {
    setIsStarted(false);
  };

  const handleMinutesChange = (event) => {
    const minutes = event.target.value;
    if (isStarted) {
      handleTimerReset();
    } else {
      if (minutes >= 0) {
        setTotalSeconds(minutes * 60);
      }
    }
  };

  const handleTimerReset = () => {
    setIsStarted(false);
    setTotalSeconds(0);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="App h-screen bg-[#1d232e]">
      <div className="pt-40">
        <div className="max-w-2xl mx-auto">
          <label className="text-[#45aacc] text-light">Enter Minutes</label>
          <input
            ref={inputRef}
            placeholder="Enter Minutes"
            onChange={handleMinutesChange}
            type="number"
            min="0"
            className="bg-transparent rounded-lg mt-1 outline-none p-2 py-3 text-white w-full border border-gray-400 [&::-webkit-inner-spin-button]:appearance-none"
            onWheel={(event) => event.currentTarget.blur()}
          />
        </div>
        <div className="max-w-2xl mt-5 mx-auto flex justify-center gap-3">
          <div>
            {isStarted ? (
              <button
                className="p-4 bg-slate-300 rounded-full"
                onClick={handleTimerPause}
              >
                <IoPause size={20} />
              </button>
            ) : (
              <button
                onClick={handleTimerStart}
                disabled={isStarted}
                className="p-4 bg-[#45aacc] rounded-full"
              >
                <FaPlay size={20} />
              </button>
            )}
          </div>

          <div className="text-4xl text-[#45aacc] font-bold flex items-center">
            <p>{formatDisplayTime(totalSeconds)}</p>
          </div>
        </div>
        <div className="max-w-2xl mt-5 mx-auto flex justify-center gap-3">
          <button
            onClick={handleTimerReset}
            className="p-2 bg-red-500 text-white px-4 rounded-md"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
