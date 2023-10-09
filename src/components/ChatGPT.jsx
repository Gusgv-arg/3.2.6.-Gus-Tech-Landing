import React from "react";
import { useState, useEffect, useRef } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { Content } from "./Content";
import DataForm from "./DataForm";
import { Modal1 } from "./Modal1";
import { Textarea } from "@nextui-org/react";

const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;

const ChatGPT = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false);
  const [numberOfMessages, setNumberOfMessages] = useState(0)
  const scrollRef = useRef(null);

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

  const getMessages = async () => {
    try {
      const newMessage = { role: "user", content: input }
      setMessages([...messages, newMessage]);
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
      setMessages([...messages, newMessage, data]);
      localStorage.setItem("messages", JSON.stringify([...messages, newMessage, data]));
      setIsTyping(false);
      setNumberOfMessages(numberOfMessages + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.scrollTop = scrollElement.scrollHeight;
    const storedMessages = JSON.parse(localStorage.getItem("messages"));

    // Set messages to storedMessages if messages is empty and storedMessages is not null
    if (messages.length === 0 && storedMessages !== null) {
      setMessages(storedMessages);
    }
  }, [messages]);

  return (
    <div className="">
      <ScrollShadow hideScrollBar size={25} className="scroll" ref={scrollRef}>
        <Content messages={messages} />
        <br />
        {numberOfMessages === 2 ? <DataForm /> : ""}
        {numberOfMessages === 1 ? <Modal1 /> : ""}
      </ScrollShadow>
      <div className="flex items-center input-container">
        {/* <input
          className={`inputText border-2 rounded p-2 ${isTyping ? 'typing' : ''}`}
          value={isTyping ? "Buscando información en mi base de conocimiento..." : input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Preguntame..."
        /> */}
        <div>
          <Textarea
            maxRows={1}
            variant="bordered"
            className={`inputText rounded p-2 ${isTyping ? 'typing' : ''}`}
            value={isTyping ? "Buscando información en mi base de conocimiento..." : input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Preguntame..."
          />
        </div>
        <div className="submit z-10" onClick={getMessages}>
           ►           
        </div>
      </div>
    </div>
  );
};

export default ChatGPT;
