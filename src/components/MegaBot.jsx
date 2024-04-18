import React from "react";
import { useState, useEffect } from "react";
import { Content } from "./Content";
import send from "../assets/xmark-circle-solid.svg"
import "./MegaBot.css"
import chatbot from "../assets/Chatbot con headphones fondo blanco.jpeg";
import { useGlobalState } from "../utils/GlobalStateContext";
import { answerQuestion1, answerQuestion2, answerQuestion3, question1, question2, question3 } from "../utils/Questions";

const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
console.log("Apuntando a:", baseURL)

const MegaBot = () => {
  
  // Access Global State
  const { messages, setMessages, showQuestion } = useGlobalState();

  // Local States
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [numberOfMessages, setNumberOfMessages] = useState(1)

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

  // For automatic scroll in the UI
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMessages = async (event) => {
    event.preventDefault()

    //If there is a blanck return
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input }
    setMessages([...messages, newMessage]);

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
        }),
        headers: {
          "Content-type": "application/json",
        },
      };

      setIsTyping(true);
      setInput("")

      /*Uso el modelo tradicional*/
      //const response = await fetch("http://localhost:4000/chatGpt/askChatGpt", options)

      /*Uso el modelo mío*/
      const response = await fetch(
        `${baseURL}/chatGpt/askMyChatGpt`,
        options
      );

      const data = await response.json();

      // Add displayed propertie so Content renders it
      data.displayed = false

      setMessages((prevMessages) => [...prevMessages, data]);
      setIsTyping(false);
      setNumberOfMessages(numberOfMessages + 1);
    } catch (error) {
      console.log(error);
      const errorMessage = { role: "assistant", content: "¡Disculpas, hubo un error, por favor intentá más tarde! ¡Gracias!", displayed: false }
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
    scrollToBottom()
  }, [messages]);

  //chatMessage.role === "user" ? "user-role" : "assistant-role"

  return (
    <div className="chat-container">

      <div className="scroll">
        {messages[messages.length - 1].displayed === true ? messages.map((chatMessage, index) => (
          <div>
            <div className={chatMessage.role === "assistant" ? "assistant-role" : "user-role"}
              key={index}>
              {chatMessage.role === "user" ? "" : <img
                src={chatbot}
                alt="chatbot"
                className="chatbot-image"
              />}
              <span>{chatMessage.content}</span><br />
            </div>

            {index === 0 && (<>
              <div className="questions-container">
                <span className="questions"><button onClick={handleQuestion1} className={showQuestion}>{question1}</button></span>
                <span className="questions"><button onClick={handleQuestion2} className={showQuestion}>{question2} </button></span>
                <span className="questions"><button onClick={handleQuestion3} className={showQuestion}>{question3}</button></span>
              </div>
            </>
            )}
            <div ref={messagesEndRef} />
          </div>
        )) : (<>
          <Content messages={messages} /> <br /><div ref={messagesEndRef} />
        </>)}        
        <br />
      </div>

      <form className="formulario" onSubmit={getMessages}>
        <div className="inputContainer">
          <input
            className={`${isTyping ? 'typing inputText' : 'inputText'}`}
            value={isTyping ? "Buscando en mi base de conocimiento..." : input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Preguntale a MegaBot..."
          />
          <button type="submit" className={input ? "submitButton" : "submitButtonWithNoInput"}>
            <img alt="send" src={send} className="img-button" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MegaBot;
