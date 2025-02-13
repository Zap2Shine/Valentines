import React, { useState } from "react";
import "./App.css";

const messages = [
  "Jenn, quieres ser mi San Valentín? ❤️",
  "Por favor? ❤️",
  "Ya puess🥺",
  "YA PE 💔",
  "YAAAA PEEEEEE",
];

const gifs = [
  "https://media1.tenor.com/m/7KO34Dn7fYsAAAAd/monkey-kiss-george-monkey.gif", // Kissing cute monkeys
  "https://media1.tenor.com/m/Zlns48v3G54AAAAC/gif-monkey.gif", // Bathing monkey
  "https://media1.tenor.com/m/uRfjIG1zcRwAAAAd/monkey-dog.gif", // Monkey kissy dog fight
  "https://media1.tenor.com/m/uxogWwFnEK4AAAAd/petting-a-monkey-dean-schneider.gif", // Monkey petting
  "https://media1.tenor.com/m/9FTcxsnbkXgAAAAC/missmlsery-monkey.gif", // Mad monkey
];

// Final message & GIF for when "Yes" is clicked
const finalMessage = "Te amo loca❤️";
const finalGif = "https://media1.tenor.com/m/ELeDr3lGcU4AAAAd/monkey.gif"; // Monkeys happy together

export default function App() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [saidYes, setSaidYes] = useState(false);

  const handleYesClick = () => {
    setSaidYes(true); // Update state to show the final message & GIF
  };

  const handleNoClick = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex(messageIndex + 1);
    } else {
      let maxWidth = window.innerWidth - 100;
      let maxHeight = window.innerHeight - 100;

      let newLeft, newTop;
      let yesButton = document.querySelector(".yes");
      let yesRect = yesButton.getBoundingClientRect();
      let gifElement = document.querySelector(".gif");
      let gifRect = gifElement ? gifElement.getBoundingClientRect() : { top: 0, bottom: 0, left: 0, right: 0 };
      let buffer = 50;

      do {
        newLeft = Math.random() * maxWidth;
        newTop = Math.random() * maxHeight;
      } while (
        (newLeft + 100 > yesRect.left - buffer &&
          newLeft < yesRect.right + buffer &&
          newTop + 50 > yesRect.top - buffer &&
          newTop < yesRect.bottom + buffer) ||
        (newLeft + 100 > gifRect.left - buffer &&
          newLeft < gifRect.right + buffer &&
          newTop + 50 > gifRect.top - buffer &&
          newTop < gifRect.bottom + buffer)
      );

      setNoButtonStyle({
        position: "fixed",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        transition: "top 0.3s ease, left 0.3s ease",
      });
    }
  };

  return (
    <div className="container">
      {/* Show final message & GIF if "Yes" was clicked */}
      <img src={saidYes ? finalGif : gifs[messageIndex]} alt="Reaction GIF" className="gif" />
      <h1 className="question">{saidYes ? finalMessage : messages[messageIndex]}</h1>

      {!saidYes && (
        <div className="buttons">
          <button className="yes" onClick={handleYesClick}>Sí</button>
          <button className="no" onClick={handleNoClick} style={noButtonStyle}>No</button>
        </div>
      )}
    </div>
  );
}