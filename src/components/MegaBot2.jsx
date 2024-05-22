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

const MegaBot2 = () => {

    // Access Global State
    const { messages, setMessages, idUser, showQuestion, isTyping, setIsTyping } = useGlobalState();

    // Local States
    const [input, setInput] = useState("");
    const [numberOfMessages, setNumberOfMessages] = useState(1)
    const [files, setFiles] = useState(null);

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

        if (file) {

            // Crear una URL para el archivo
            /* const fileUrl = URL.createObjectURL(file);
            console.log('URL del archivo:', fileUrl); */

            const reader = new FileReader();

            reader.onload = function (event) {
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.width = '30px';
                    img.style.height = '30px';
                    const container = document.getElementById('imagePreviewContainer');
                    container.innerHTML = ''; // Limpia el contenedor antes de añadir la nueva imagen
                    container.appendChild(img);
                    setFiles(file);
                }
            };

            // Leer el archivo como URL de datos
            reader.readAsDataURL(file);
            //console.log("typeof files--->", typeof files)
        }
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
            channel: "web", type: "text"
        } 
        setMessages([...messages, newMessage]);

        try {
            let data;

            //Change typing state for visual effect && clean input
            setIsTyping(true);
            setInput("")
            //setFiles(null)

            const formData = new FormData();
            formData.append('messages', JSON.stringify(newMessage));

            // Agregar el archivo si existe
            if (files) {
                formData.append('files', files);
            }

            // Para depurar y ver el contenido de formData
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await axios.post(`${baseURL}/megabot`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Add displayed propertie so Content renders it and others
            data = response.data
            data.displayed = false

            //Change states
            setMessages((prevMessages) => [...prevMessages, data]);
            setIsTyping(false);
            setNumberOfMessages(numberOfMessages + 1);
            setFiles(null);
        } catch (error) {
            console.log(error);
            const errorMessage = { role: "assistant", content: "¡Disculpas, hubo un error, por favor intentá más tarde! ¡Gracias!", displayed: false }
            setIsTyping(false);
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
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

                    <div id="imagePreviewContainer"></div>

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

export default MegaBot2;
