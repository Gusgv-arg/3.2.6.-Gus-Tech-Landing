import React, { useState, useEffect } from "react";
import "animate.css"
import chatbot from "../assets/Chatbot con headphones fondo blanco.jpeg";

import { question1, answerQuestion1, question2, answerQuestion2, question3, answerQuestion3 } from "../utils/Questions";
import { useGlobalState } from "../utils/GlobalStateContext";


export const Content = (props) => {
  const [printedContent, setPrintedContent] = useState([]);
  
  // Access Global State
  const { messages, setMessages, showQuestion, setShowQuestion } = useGlobalState();

  // For automatic scroll in the UI
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuestion1 = () => {
    const newMessage = { role: "assistant", content: answerQuestion1, displayed: false };
    setMessages([...messages, newMessage]);
  };
  const handleQuestion2 = () => {
    const newMessage = { role: "assistant", content: answerQuestion2, displayed: false };
    setMessages([...messages, newMessage]);
  };
  const handleQuestion3 = () => {
    const newMessage = { role: "assistant", content: answerQuestion3, displayed: false };
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    let lastAssistantMessage
    let intervalId;

    if (props.messages) {
      const lastAssistantMessageIndex = props.messages
        .map((chatMessage, index) => (chatMessage.role === "assistant" ? index : -1))
        .filter((index) => index !== -1)
        .pop();

      if (lastAssistantMessageIndex !== undefined) {
        lastAssistantMessage = props.messages[lastAssistantMessageIndex];

        if (lastAssistantMessage.displayed === false) {

          const content = lastAssistantMessage.content.split("");
          let currentIndex = 0;

          intervalId = setInterval(() => {
            setPrintedContent((prevContent) => {
              const newContent = [...prevContent];
              newContent[lastAssistantMessageIndex] = content.slice(0, currentIndex + 1).join("");
              return newContent;
            });
            currentIndex++;

            // Printed words -> change questions to visible & save in local storage
            if (currentIndex === content.length) {
              clearInterval(intervalId);         
              setShowQuestion("visible-question")
              localStorage.setItem("showQuestion", JSON.stringify(showQuestion));
            }
          }, 10);
        }
      }
      scrollToBottom()
      return () => {
        clearInterval(intervalId);
      };
    } else {
      return
    }
  }, [props.messages]);

  return (
    <>
      {props.messages?.map((chatMessage, index) => (
        <div>
          <div className={chatMessage.role === "assistant" ? "assistant-role" : "user-role"}
            key={index}>
            {chatMessage.role === "user" ? "" : <img
              src={chatbot}
              alt="chatbot"
              className="chatbot-image"
            />}
            <span>{chatMessage.role === "assistant" && index === props.messages.length - 1 ? printedContent[index] : chatMessage.content}</span>
          </div>

          {index === 0 && (<>
            <div className="questions-container">
              <span className="questions"><button onClick={handleQuestion1} className={showQuestion}>{question1}</button></span>
              <span className="questions"><button onClick={handleQuestion2} className={showQuestion}>{question2} </button></span>
              <span className="questions"><button onClick={handleQuestion3} className={showQuestion}>{question3}</button></span>
            </div>
          </>
          )}
          <br></br>
          <div ref={messagesEndRef} />
        </div>
      ))}
    </>
  );
};

