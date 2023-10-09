import React, { useState, useEffect } from "react";
import "animate.css"
import chatbot from "../assets/Chatbot con headphones fondo blanco.jpeg";

export const Content = (props) => {
  const [printedContent, setPrintedContent] = useState([]);

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

    return () => {
      clearInterval(intervalId);
    };
  }, [props.messages]);

  return (
    <div className="p-5 text-black animate__animated animate__fadeIn">
      <p className="parrafo bg-black">
        <strong>HOLA!</strong>
        <br />
        <br />
        Soy un ChatBot de Inteligencia Artificial. Te invito a conversar haciendome las preguntas que creas necesarias para entender como los Chatbots de IA te pueden ayudar en tu negocio!
        <br />
        <br />
        <strong>Ejemplos de Preguntas posibles:</strong>
        <br />
        ¿Qué beneficios trae implementar un Chatbot de IA?
        <br />
        ¿Cómo hace el Chatbot para saber sobre mi empresa?
        <br />
        ¿Cuáles son los casos de uso?
        <br />
        <br />
        <strong>¡Preguntame! 👇</strong>
      </p>
      <br />

      <ul>
        {props.messages?.map((chatMessage, index) => (
          <li
            flex
            className={chatMessage.role === "user" ? "user-role" : "assistant-role"}
            key={index}
          >            
            <p className="mr-2">
              <strong>{chatMessage.role === "user" ? "Usuario:" : <img
                src={chatbot}
                alt="chatbot"
                fill="none"
                height="36"
                viewBox="0 0 32 32"
                width="36"                
              />}</strong>
            </p>
            <p>{chatMessage.role === "assistant" && index=== props.messages.length - 1 ? printedContent[index] : chatMessage.content}</p><br/>
          </li>
        ))}
      </ul>
    </div>
  );
};
