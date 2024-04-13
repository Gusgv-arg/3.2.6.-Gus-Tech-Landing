import React from "react";
import { useState, useEffect } from "react";
import { Content } from "./Content";
import { Modal1 } from "./Modal1";
import send from "../assets/xmark-circle-solid.svg"
import "./MegaBot.css"

const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
console.log("Apuntando a:", baseURL)

const MegaBot = () => {
  const greeting = "Soy un ChatBot de Inteligencia Artificial. Te invito a conversar haciendome las preguntas que creas necesarias para entender como los Chatbots de IA te pueden ayudar en tu negocio!Soy un ChatBot de Inteligencia Artificial. Te invito a conversar haciendome las preguntas que creas necesarias para entender como los Chatbots de IA te pueden ayudar en tu negocio!Soy un ChatBot de Inteligencia Artificial. Te invito a conversar haciendome las preguntas que creas necesarias para entender como los Chatbots de IA te pueden ayudar en tu negocio!"
  
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{role: "assistant", content: greeting}])
  const [isTyping, setIsTyping] = useState(false);
  const [numberOfMessages, setNumberOfMessages] = useState(0)

  // For automatic scroll in the UI
  /* const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }; */

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
      setMessages((prevMessages) => [...prevMessages, data]);
      // --- If I want to persist the State in the browser ---//
      //localStorage.setItem("messages", JSON.stringify([...messages, newMessage, data]));

      setIsTyping(false);
      setNumberOfMessages(numberOfMessages + 1);
    } catch (error) {
      console.log(error);
      const errorMessage = { role: "assistant", content: "¡Disculpas, hubo un error, por favor intentá más tarde! ¡Gracias!" }
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  useEffect(() => {
    //scrollToBottom()
  }, [messages]);

  return (
    <div className="chat-container">

      <div className="scroll" /* ref={messagesEndRef} */ >
        <Content messages={messages} /* ref={messagesEndRef} */ />
        {/* {numberOfMessages === 1 ? <Modal1 /> : ""} */}
        <br />        
      </div>

      <form className="formulario" onSubmit={getMessages}>
        <input
          className={`${isTyping ? 'typing inputText' : 'inputText'}`}
          value={isTyping ? "Buscando información en mi base de conocimiento..." : input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Preguntame..."
        />
        <button type="submit" className="submitButton">
          <img alt="send" src={send} className="img-button" />
        </button>
      </form>

    </div>
  );
};

export default MegaBot;
