import axios from "axios";

const baseURL =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_API_URL_PROD
		: process.env.REACT_APP_API_URL_LOCAL;

export const handleQuestions = async (idUser, question, idQuestion, messages, setMessages) => {
	const newMessage = {
		id_user: idUser,
		name: "Web User",
		channel: "web",
		role: "user",
		content: question,
		displayed: false,
		question: idQuestion,
	};
	setMessages([...messages, newMessage ]);
	try {
		let data;
		//setIsTyping(true);
		//setInput("")
		const response = await axios.post(`${baseURL}/megabot`, {
			messages: newMessage,
		});
		data = response.data;
		data.displayed = false;
		console.log("respuesta api", data)
		return data
		//setMessages((prevMessages) => [...prevMessages, data]);
		//setIsTyping(false);
		//setNumberOfMessages(numberOfMessages + 1);
	} catch (error) {
		console.log(error);
		const errorMessage = {
			role: "assistant",
			content:
				"¡Disculpas, hubo un error, por favor intentá más tarde! ¡Gracias!",
			displayed: false,
		};
		//setIsTyping(false);
		setMessages((prevMessages) => [...prevMessages, errorMessage]);
	}
};
