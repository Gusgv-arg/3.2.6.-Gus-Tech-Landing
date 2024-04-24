import React from "react";
import { useState, useEffect } from "react";
import { Content } from "./Content";
import send from "../assets/arrow-up-circle-solid.svg"
import "./MegaBot.css"
import axios from "axios"
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
    const question = {role: "user", content: question1, displayed: false}
    const newMessage = { role: "assistant", content: answerQuestion1, displayed: false };
    setMessages([...messages, question, newMessage]);
  };
  const handleQuestion2 = () => {
    const question = {role: "user", content: question2, displayed: false}
    const newMessage = { role: "assistant", content: answerQuestion2, displayed: false };
    setMessages([...messages, question, newMessage]);
  };
  const handleQuestion3 = () => {
    const question = {role: "user", content: question3, displayed: false}
    const newMessage = { role: "assistant", content: answerQuestion3, displayed: false };
    setMessages([...messages, question, newMessage]);
  };

  // For automatic scroll in the UI
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Define user ID: if its not saved in localstorage create one with the timestamp
  const idUser = localStorage.getItem("id_user") ? localStorage.getItem("id_user") : localStorage.setItem("id_user", Date.now())
  
  const getMessages = async (event) => {
    event.preventDefault()

    //If there is a blanck return
    if (!input.trim()) return;

    //Object of the user message
    const newMessage = {
      role: "user", content: input, id_user: idUser, name: "Web User",
      channel: "web"
    }
    setMessages([...messages, newMessage]);
    
    try {
      let data;

      //Change typing state for visual effect && clean input
      setIsTyping(true);
      setInput("")

      // If numberOfMessages (user typing a message) === 1; send messages completely to the API to save them
      if (numberOfMessages === 1) {
        let allMessages = messages
        allMessages.push(newMessage)
        const response = await axios.post(`${baseURL}/megabot`, { messages: allMessages });
        data = response.data

      } else {
        // Post to the API the last message of the user
        const response = await axios.post(`${baseURL}/megabot`, { messages: newMessage });
        data = response.data
      }
      // Add displayed propertie so Content renders it and others
      data.displayed = false

      //Change states
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
            <br></br>
            <div ref={messagesEndRef} />
          </div>
        )) : (<>
          <Content messages={messages} /> <br /><div ref={messagesEndRef} />
        </>)}
        <br />
      </div>

      <div className="inputContainer">
        <form className="formulario" onSubmit={getMessages}>
          <input
            className={`${isTyping ? 'typing inputText' : 'inputText'}`}
            value={isTyping ? "Buscando en mi base de conocimiento..." : input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Preguntale a MegaBot..."
          />
          <button type="submit" className={input ? "submitButton" : "submitButtonWithNoInput"} disabled={!input}>
            <img alt="send" src={send} className="img-button" />
          </button>
        </form>
      </div>

    </div>
  );
};

export default MegaBot;
