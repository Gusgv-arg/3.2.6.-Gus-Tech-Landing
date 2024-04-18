import React, { createContext, useContext, useState } from "react";
import { question1, question2, question3 } from "./Questions";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

const greeting = "¡Hola!👋 Soy MegaBot, Asistente virtual impulsado por Inteligencia Artificial entrenado para responder preguntas sobre como estos tipos de ChatBots pueden potenciar tu negocio. Para comenzar podes seleccionar una pregunta o directamente conversar. !Empecemos!"
 const questions = [{question: question1}, {question: question2}, {question: question3}]
const initialState = [{ role: "assistant", content: greeting, isGreeting: true, displayed: false, questions: questions }]

// Without local storage
/* export const GlobalStateProvider = ({ children }) => {
  const [messages, setMessages] = useState(initialState);
  const [showQuestion, setShowQuestion] = useState("hidden-question");

  return (
    <GlobalStateContext.Provider value={{ messages, setMessages, showQuestion, setShowQuestion }}>
      {children}
    </GlobalStateContext.Provider>
  );
}; */

// With local storage
export const GlobalStateProvider = ({ children }) => {
  const storedMessages = localStorage.getItem("messages");
  const initialMessages = storedMessages ? JSON.parse(storedMessages) : initialState;

  const storedQuestion = localStorage.getItem("showQuestion");
  let initialShowQuestion = storedQuestion ? JSON.parse(storedQuestion) : "hidden-question";

  const [messages, setMessages] = useState(initialMessages);
  const [showQuestion, setShowQuestion] = useState(initialShowQuestion);

  return (
    <GlobalStateContext.Provider value={{ messages, setMessages, showQuestion, setShowQuestion }}>
      {children}
    </GlobalStateContext.Provider>
  );
};