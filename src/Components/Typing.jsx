import React, { useEffect, useState ,useRef } from "react";
import "../App.css";

import Text from "../Text.js";

function TypingGame() {
    const randomInteger = Math.floor(Math.random() * 5);

  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState(Text[randomInteger].text);
  const [points, setPoints] = useState(0);
  const [wrongpoints, setWrongPoints] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
//   const[speed, setSpeed] = useState(0);
  
  const inputRef = useRef();
  const countdown = useRef(null)
//   let countdown.current;
  useEffect(() => {
    inputRef.current.focus();

    

    if (!isInputDisabled) {
      countdown.current= setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    const timeout = setTimeout(() => {

      setIsInputDisabled(true);
      clearInterval(countdown.current);
      setText("");
      
    }, 60000);
    
    return () => {
      clearInterval(countdown.current);
      clearTimeout(timeout);
    };
  }, [isInputDisabled]);



  const handleStart = () => {
    
    setIsInputDisabled(false);
    
    inputRef.current.focus();

    setOriginalText(Text[randomInteger].text);
    setText("");
    setPoints(0);
    setWrongPoints(0);
    setCurrentIndex(0);
    setTimer(60);
    
  };

  const handleChange = (event) => {
    const typedText = event.target.value;
    setText(typedText);

    let currentPoints = 0;
    let wrongPoints = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === originalText[i]) {
        currentPoints++;
      } else {
        wrongPoints++;
      }
    }
    setPoints(currentPoints);
    setWrongPoints(wrongPoints);
    let total = currentPoints + wrongPoints;
    if (total > currentIndex) {
      setCurrentIndex(typedText.length);
    }
    if(text.length===originalText.length-1)
    {
       setIsInputDisabled(true);
       clearInterval(countdown.current);
    }
  };

  const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  return minutes + ":" + formattedSeconds;
};


  const getCharacterStyle = (char, index) => {
    if (index < text.length) {
      return text[index] === char ? { color: "green" } : { color: "red" };
    }
   
  };

  return (
    <div>
      <div className="main">
      <div className="child">
    <center><p>Time Remaining: {formatTime(timer)}</p>
</center>
        <p>
          {originalText.split("").map((char, index) => (
            <span key={index} style={getCharacterStyle(char, index)}>
              {char}
            </span>
          ))}
        </p>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          disabled={isInputDisabled}
          spellCheck="false"
          
        />
        <center><button onClick={handleStart}>
            {isInputDisabled?<p>start</p>:<p>Restart</p>}
          </button>
        </center> 
    </div>
    </div>
      
        <center>
        <p>Correct Points: {points}</p>
        <p>Wrong Points: {wrongpoints}</p>
        <p>Total Points: {currentIndex}</p>
        </center>
        
         
      
     
    </div>
  );
}

export default TypingGame;
          
