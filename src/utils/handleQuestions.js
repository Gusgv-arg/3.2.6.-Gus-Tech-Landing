import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL_PROD ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
console.log("baseurl desde handleQuestions", baseURL)

export const handleQuestions = async (
	idUser,
	question,
	idQuestion,
	messages,
	setMessages
) => {
	const newMessage = {
		id_user: idUser,
		name: "Web User",
		channel: "web",
		role: "user",
		content: question,
		displayed: false,
		question: idQuestion,
	};
	setMessages([...messages, newMessage]);
	try {
		let data;
		const response = await axios.post(`${baseURL}/megabot`, {
			messages: newMessage,
		});
		data = response.data;
		data.displayed = false;
		return data;
	} catch (error) {
		console.log("Error desde handleQuestions:", error.message);
		const errorMessage = {
			role: "assistant",
			content:
				"¡Disculpas, estamos haciendo modificaciones! Por favor intentá más tarde. ¡Gracias!",
			displayed: false,
		};
		
		return errorMessage;
	}
};
