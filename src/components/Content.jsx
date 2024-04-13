import React, { useState, useEffect } from "react";
import "animate.css"
import chatbot from "../assets/Chatbot con headphones fondo blanco.jpeg";
import "./Content.css"

export const Content = (props) => {
  const [printedContent, setPrintedContent] = useState([]);

// For automatic scroll in the UI
const messagesEndRef = React.useRef(null);
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};


  useEffect(() => {
    let intervalId;

    if (props.messages) {
      const lastAssistantMessageIndex = props.messages
        .map((chatMessage, index) => (chatMessage.role === "assistant" ? index : -1))
        .filter((index) => index !== -1)
        .pop();

      if (lastAssistantMessageIndex !== undefined) {
        const lastAssistantMessage = props.messages[lastAssistantMessageIndex];
        const content = lastAssistantMessage.content.split("");
        let currentIndex = 0;

        intervalId = setInterval(() => {
          setPrintedContent((prevContent) => {
            const newContent = [...prevContent];
            newContent[lastAssistantMessageIndex] = content.slice(0, currentIndex + 1).join("");
            return newContent;
          });

          currentIndex++;

          if (currentIndex === content.length) {
            clearInterval(intervalId);
          }
        }, 10);
      }
    }

    scrollToBottom()
    return () => {
      clearInterval(intervalId);
    };
  }, [props.messages]);

  return (
    <>
      
      {props.messages?.map((chatMessage, index) => (
        <div className={chatMessage.role === "user" ? "user-role" : "assistant-role"}
          key={index}>
          {chatMessage.role === "user" ? "" : <img
            src={chatbot}
            alt="chatbot"
            className="chatbot-image"
          />}
          <span>{chatMessage.role === "assistant" && index === props.messages.length - 1 ? printedContent[index] : chatMessage.content}</span><br />
        <div ref={messagesEndRef}/>
        </div>
      ))}
    </>

  );
};
