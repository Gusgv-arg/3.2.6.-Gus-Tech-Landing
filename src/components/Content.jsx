import React, { useState, useEffect } from "react";
import "animate.css"
import chatbot from "../assets/Chatbot con headphones fondo blanco.jpeg";
import { question1, question2, question3 } from "../utils/Questions";
import { useGlobalState } from "../utils/GlobalStateContext";
import { handleQuestions } from "../utils/handleQuestions";

export const Content = (props) => {
  const [printedContent, setPrintedContent] = useState([]);

  // Access Global State
  const { messages, setMessages, idUser, showQuestion, setShowQuestion } = useGlobalState();

  // For automatic scroll in the UI
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // For answering initial questions
  const handleClickQuestion1 = async () => {
    const idQuestion = "question1"
    const response = await handleQuestions(idUser, question1, idQuestion, messages, setMessages);
    setMessages((prevMessages) => [...prevMessages, response])
  };

  const handleClickQuestion2 = async () => {
    const idQuestion = "question2"
    const response = await handleQuestions(idUser, question2, idQuestion, messages, setMessages);
    setMessages((prevMessages) => [...prevMessages, response])
  };

  const handleClickQuestion3 = async () => {
    const idQuestion = "question3"
    const response = await handleQuestions(idUser, question3, idQuestion, messages, setMessages);
    setMessages((prevMessages) => [...prevMessages, response])
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
              <span className="questions"><button onClick={handleClickQuestion1} className={showQuestion}>{question1}</button></span>
              <span className="questions"><button onClick={handleClickQuestion2} className={showQuestion}>{question2} </button></span>
              <span className="questions"><button onClick={handleClickQuestion3} className={showQuestion}>{question3}</button></span>
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

