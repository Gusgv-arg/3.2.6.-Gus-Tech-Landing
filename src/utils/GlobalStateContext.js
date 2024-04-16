import React, { createContext, useContext, useState } from "react";
import { question1, question2, question3 } from "./Questions";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

const greeting = "¡Hola!👋 Soy MegaBot, Asistente virtual impulsado por Inteligencia Artificial. Para comenzar podes seleccionar la pregunta que quieras o directamente conversar y descubrir como los Chatbots de IA te pueden ayudar en tu negocio. !Empecemos!"
 const questions = [{question: question1}, {question: question2}, {question: question3}]
const initialState = [{ role: "assistant", content: greeting, isGreeting: true, displayed: false, questions: questions }]

export const GlobalStateProvider = ({ children }) => {
  const [messages, setMessages] = useState(initialState);

  return (
    <GlobalStateContext.Provider value={{ messages, setMessages }}>
      {children}
    </GlobalStateContext.Provider>
  );
};