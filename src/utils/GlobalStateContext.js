import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

const greeting ="¡Hola!👋 Soy MegaBot, Asistente virtual impulsado por Inteligencia Artificial entrenado para ayudarte a entender como puedo ayudarte a potenciar tu negocio con esta tecnología. Para comenzar podes seleccionar una pregunta o directamente conversar. ¡Empecemos! 🚀";

const initialState = [
	{
		role: "assistant",
		content: greeting,
		isGreeting: true,
		displayed: false
	},
];

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
	const initialMessages = storedMessages
		? JSON.parse(storedMessages)
		: initialState;
	const [messages, setMessages] = useState(initialMessages);

	// Define user ID: if its not saved in localstorage create one
	const storedIdUser = localStorage.getItem("id_user");
	const initialIdUser = storedIdUser ? JSON.parse(storedIdUser) : localStorage.setItem("id_user", Date.now());
	const [idUser, setIdUser] = useState(initialIdUser);

	const storedQuestion = localStorage.getItem("showQuestion");
	let initialShowQuestion = storedQuestion
		? JSON.parse(storedQuestion)
		: "hidden-question";
	const [showQuestion, setShowQuestion] = useState(initialShowQuestion);
	
	const [isTyping, setIsTyping] = useState(false) 
	return (
		<GlobalStateContext.Provider
			value={{
				messages,
				setMessages,
				idUser,
				setIdUser,
				showQuestion,
				setShowQuestion,
				isTyping,
				setIsTyping
			}}
		>
			{children}
		</GlobalStateContext.Provider>
	);
};
