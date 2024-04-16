import React from "react";
import { useState, useEffect } from "react";
import { Content } from "./Content";
import send from "../assets/xmark-circle-solid.svg"
import "./MegaBot.css"
import chatbot from "../assets/Chatbot con headphones fondo blanco.jpeg";
import { useGlobalState } from "../utils/GlobalStateContext";

const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
console.log("Apuntando a:", baseURL)

const MegaBot = () => {

  //Para que tome local storage: ACTIVAR DESPUES DE HABER DESARROLLADO
  /* const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [{ role: "assistant", content: greeting, displayed: false }];
  }); */

  // Access Global State
  const { messages, setMessages } = useGlobalState();

  // Local States
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [numberOfMessages, setNumberOfMessages] = useState(1)

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


  return (
    <div className="chat-container">

      <div className="scroll">

        {messages[messages.length - 1].displayed === true ? messages.map((chatMessage, index) => (
          <div className={chatMessage.role === "user" ? "user-role" : "assistant-role"}
            key={index}>
            {chatMessage.role === "user" ? "" : <img
              src={chatbot}
              alt="chatbot"
              className="chatbot-image"
            />}
            <span>{chatMessage.content}</span><br />
           
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
