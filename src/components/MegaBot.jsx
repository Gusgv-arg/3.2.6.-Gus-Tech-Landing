import React from "react";
import { useState, useEffect, useRef } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { Content } from "./Content";
import DataForm from "./DataForm";
import { Modal1 } from "./Modal1";
//import send from "../assets/square3d-from-center.svg"
//import send from "../assets/xmark-square-solid.svg"
import send from "../assets/xmark-circle-solid.svg"

const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
//const baseURL = "https://api-landingpage.onrender.com"
console.log("Apuntando a:", baseURL)

const MegaBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false);
  const [numberOfMessages, setNumberOfMessages] = useState(0)
  const scrollRef = useRef(null);

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
    const scrollElement = scrollRef.current;
    scrollElement.scrollTop = scrollElement.scrollHeight;
        
  }, [messages]);

  return (
    <div className="">
      <ScrollShadow hideScrollBar size={25} className="scroll" ref={scrollRef}>
        <Content messages={messages} />
        <br />
        {numberOfMessages === 2 ? <DataForm /> : ""}
        {numberOfMessages === 1 ? <Modal1 /> : ""}
      </ScrollShadow>
      <form className="flex items-center input-container" onSubmit={getMessages}>
        <input
          className={`inputText border-2 rounded p-2 ${isTyping ? 'typing' : ''}`}
          value={isTyping ? "Buscando información en mi base de conocimiento..." : input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Preguntame..."
        />
        <button type="submit" className="submit z-10">
          <img alt="send" src={send} />
        </button>
      </form>
    </div>
  );
};

export default MegaBot;
