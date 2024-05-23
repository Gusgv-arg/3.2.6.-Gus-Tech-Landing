import React from "react";
import { useState, useEffect, useRef } from "react";
import { Content } from "./Content";
import send from "../assets/arrow-up-circle-solid.svg"
import "./MegaBot.css"
import axios from "axios"
import chatbot from "../assets/Chatbot con headphones fondo blanco.jpeg";
import attach from "../assets/AkarIconsAttach.svg"
import { useGlobalState } from "../utils/GlobalStateContext";
import { question1, question2, question3 } from "../utils/Questions";
import { handleQuestions } from "../utils/handleQuestions";

const baseURL = process.env.REACT_APP_API_URL_PROD ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
console.log("Apuntando a:", baseURL)
console.log(process.env.NODE_ENV)

const MegaBot3 = () => {

    // Access Global State
    const { messages, setMessages, idUser, showQuestion, isTyping, setIsTyping } = useGlobalState();

    // Local States
    const [input, setInput] = useState("");
    const [numberOfMessages, setNumberOfMessages] = useState(1)
    const [filesSent, setFilesSent] = useState();
    const [filesPreviews, setFilePreviews] = useState()

    // For answering initial questions
    const handleClickQuestion1 = async () => {
        setIsTyping(true);
        const idQuestion = "question1"
        const response = await handleQuestions(idUser, question1, idQuestion, messages, setMessages);
        setMessages((prevMessages) => [...prevMessages, response])
        setIsTyping(false);
    };

    const handleClickQuestion2 = async () => {
        setIsTyping(true);
        const idQuestion = "question2"
        const response = await handleQuestions(idUser, question2, idQuestion, messages, setMessages);
        setMessages((prevMessages) => [...prevMessages, response])
        setIsTyping(false);
    };

    const handleClickQuestion3 = async () => {
        setIsTyping(true);
        const idQuestion = "question3"
        const response = await handleQuestions(idUser, question3, idQuestion, messages, setMessages);
        setMessages((prevMessages) => [...prevMessages, response])
        setIsTyping(false)
    };

    //For attachment
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFilesSent(file) //hace falta?????         

        const objectUrl = URL.createObjectURL(file);
        setFilePreviews(objectUrl);
        //Free memory
        //URL.revokeObjectURL(objectUrl)
    };

    // For automatic scroll in the UI
    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getMessages = async (event) => {
        event.preventDefault()

        //If there is a blanck return
        if (!input.trim()) return;

        //Object of the user message
        const newMessage = {
            role: "user", content: input, id_user: idUser, name: "Web User",
            channel: "web", type: "text", image: filesPreviews
        }
        setMessages([...messages, newMessage]);

        //FormData
        const formData = new FormData();
        formData.append('messages', JSON.stringify(newMessage));

        if (filesSent) {
            // Append file to formData & clean container in input
            formData.append('files', filesSent);
        }

        // For console.log formData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            let data;

            //Change typing state for visual effect && clean input
            setIsTyping(true);
            setInput("")
            setFilePreviews()

            // Post to the API
            const response = await axios.post(`${baseURL}/megabot`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 25000
            });
            // Add displayed propertie so Content renders it and others
            data = response.data
            data.displayed = false

            //Change states
            setMessages((prevMessages) => [...prevMessages, data]);
            setIsTyping(false);
            setNumberOfMessages(numberOfMessages + 1);
            setFilesSent();

        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                // manejar tiempo de espera
                console.log("Error in the request", error.message)
                const errorMessage = { role: "assistant", content: "¡Disculpas 🙏! Decidí abortar la solicitud porque el servidor donde está mi Base de Conocimiento está con algún problema. No es habitual pero puede suceder. Por favor intentá más tarde. ¡Saludos de MegaBot! 🙂", displayed: false }
                setIsTyping(false);
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            } else {
                console.log(error);
                const errorMessage = { role: "assistant", content: "¡Disculpas 🙏! Hubo un error interno y no pude contestar a tu pregunta. Por favor intentá más tarde! ¡Saludos de MegaBot! 🙂", displayed: false }
                setIsTyping(false);
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            }
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
                    <div>
                        <div className={chatMessage.role === "assistant" ? "assistant-role" : "user-role"}
                            key={index}>
                            {chatMessage.role === "user" ? "" : <img
                                src={chatbot}
                                alt="chatbot"
                                className="chatbot-image"
                            />}
                            <span>{chatMessage.content}</span><br />
                            {chatMessage.image && <img src={chatMessage.image} className="img-view" alt="img" />}
                        </div>

                        {index === 0 && (<>
                            <div className="questions-container">
                                <span className="questions"><button onClick={handleClickQuestion1} className={showQuestion}>{question1}</button></span>
                                <span className="questions"><button onClick={handleClickQuestion2} className={showQuestion}>{question2} </button></span>
                                <span className="questions"><button onClick={handleClickQuestion3} className={showQuestion}>{question3}</button></span>
                            </div>
                        </>
                        )}
                        <br></br>
                    </div>
                )) : (<>
                    <Content messages={messages} /> <br /><div ref={messagesEndRef} />
                </>)}
                <br />
            </div>
            <div className="endRef" ref={messagesEndRef} />


            <div className="inputContainer">
                <form className="formulario" onSubmit={getMessages}>
                    <input
                        className={`${isTyping ? 'typing inputText' : 'inputText'}`}
                        value={isTyping ? "Buscando en mi base de conocimiento..." : input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Preguntale a MegaBot..."

                    />
                    {filesPreviews && <img src={filesPreviews} className="img-preview" alt="img" />}

                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef} // Referencia para activar el clic
                        onChange={handleFileChange}
                    />
                    <img
                        src={attach}
                        alt="Attach file"
                        onClick={() => fileInputRef.current.click()} // Simula un clic en el input de tipo file
                        className="attachButton"
                    />
                    <button type="submit" className={input ? "submitButton" : "submitButtonWithNoInput"} disabled={!input}>
                        <img alt="send" src={send} className="img-button" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MegaBot3;
