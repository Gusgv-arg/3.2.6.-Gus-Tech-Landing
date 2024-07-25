import React from "react";
import { useState, useEffect, useRef } from "react";
import { Content } from "./Content";
import "./MegaBot.css"
import axios from "axios"
import { useGlobalState } from "../utils/GlobalStateContext";
import { question1, question2, question3 } from "../utils/Questions";
import { handleQuestions } from "../utils/handleQuestions";
import { useReactMediaRecorder } from "react-media-recorder-2";
import chatbot from "../assets/Chatbot con headphones fondo blanco.jpeg";
import attach from "../assets/AkarIconsAttach.svg"
import broom from "../assets/Broom.svg"
import trash from "../assets/TrashGrey.svg"
import microphone from "../assets/Microphone.svg"
import record from "../assets/RecordGreen.svg"
import send from "../assets/SendGreen.svg"
import pause from "../assets/PauseRed.svg"

const baseURL = process.env.REACT_APP_API_URL_PROD ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
console.log("Apuntando a:", baseURL)
console.log(process.env.NODE_ENV)

const MegaBot = () => {

    // Access Global State
    const { messages, setMessages, idUser, showQuestion, isTyping, setIsTyping } = useGlobalState();

    // Local States
    const [input, setInput] = useState("");
    const [numberOfMessages, setNumberOfMessages] = useState(1)
    const [filesSent, setFilesSent] = useState();
    const [filesPreviews, setFilePreviews] = useState()

    const fileInputRef = useRef(null);

    // ------- Audio functions --------//      
    const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl, pauseRecording, resumeRecording } =
        useReactMediaRecorder({ audio: true });
    //console.log("mediaBlobUrl", mediaBlobUrl)
    //console.log("Status--->", status)

    const urlToBlob = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    }

    // For reseting local storage and messages
    const resetMessages = () => {
        // Reset localStorage
        localStorage.removeItem("messages");

        // Reset state
        const initialMessage = {
            role: "assistant",
            content: "¡Hola!👋 Soy MegaBot, Asistente virtual impulsado por Inteligencia Artificial entrenado para ayudarte a entender como podes potenciar tu negocio con esta tecnología. Para comenzar podes seleccionar una pregunta o directamente conversar. ¿Empezamos? 🚀",
            displayed: true
        };
        setMessages([initialMessage]);
    };

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

    //For file attachments
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

    // ----- Sending request to the API ----- //    
    const getMessages = async (event) => {
        event.preventDefault();
        if (!input.trim() && !mediaBlobUrl) return;

        const newMessage = {
            role: "user",
            content: input,
            id_user: idUser,
            name: "Web User",
            channel: "web",
            type: mediaBlobUrl ? "audio" : "text",
            image: filesPreviews,
            audio: mediaBlobUrl
        };
        setMessages([...messages, newMessage]);

        const formData = new FormData();
        formData.append('messages', JSON.stringify(newMessage));

        if (filesSent) {
            formData.append('files', filesSent);
        }

        if (mediaBlobUrl) {
            const audioBlob = await urlToBlob(mediaBlobUrl);
            formData.append('audio', audioBlob, 'audio.webm');
            clearBlobUrl()
        }

        try {
            setIsTyping(true);
            setInput("");
            setFilePreviews();
            setFilesSent();

            const response = await axios.post(`${baseURL}/megabot`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 13000
            });

            // If the response is audio, create an object URL for it
            let data;
            if (response.headers['content-type'].startsWith('audio/')) {
                const audioUrl = URL.createObjectURL(response.data);
                data = { role: "assistant", type: "audio", audio: audioUrl, displayed: false };
            } else {
                data = response.data;
                data.displayed = false;
            }

            setMessages((prevMessages) => [...prevMessages, data]);
            setIsTyping(false);
            setNumberOfMessages(numberOfMessages + 1);
            setFilesSent();
        } catch (error) {
            console.error("Error in request:", error);
            let errorMessage
            if (newMessage.type === "audio") {
                errorMessage = {
                    role: "assistant",
                    content: "Lo siento, estoy trabajando para dentro de poco tiempo poder procesar tus audios.",
                    displayed: false
                };
            } else {
                errorMessage = {
                    role: "assistant",
                    content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta nuevamente.",
                    displayed: false
                };
            }
            setIsTyping(false);
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(messages));
        scrollToBottom()
        if (status === "idle") {
            stopRecording()
        }
    }, [messages, status]);

    return (
        <div className="chat-container">

            <div className="scroll">

                {messages[messages.length - 1].displayed === true ? messages.map((chatMessage, index) => (
                    <div key={index}>
                        <div className={chatMessage.role === "assistant" ? "assistant-role" : "user-role"}
                        >
                            {chatMessage.role === "user" ? "" : <img
                                src={chatbot}
                                alt="chatbot"
                                className="chatbot-image"
                            />}
                            <span>{chatMessage.content}</span><br />
                            {chatMessage.image && <img src={chatMessage.image} className="img-view" alt="img" />}
                            {chatMessage.type === "audio" && <audio src={chatMessage.audio} controls />}
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
                    <div className="attachContainer">
                        <img
                            src={attach}
                            alt="Attach file"
                            onClick={() => fileInputRef.current.click()} // Simula un clic en el input de tipo file
                            className="attachButton"
                        />
                    </div>
                    <input
                        name="file"
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef} // Referencia para activar el clic
                        onChange={handleFileChange}
                    />
                    <input
                        name="message"
                        className={`${isTyping ? 'typing inputText' : 'inputText'}`}
                        value={isTyping ? "Buscando en mi base de conocimiento..." : input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Preguntale a MegaBot..."

                    />
                    {filesPreviews && <img src={filesPreviews} className="img-preview" alt="img" />}

                    <button type="submit" className={input || mediaBlobUrl ? "submitButton" : "submitButtonWithNoInput"} disabled={!input && !mediaBlobUrl}>
                        {/* <img alt="send" src={send} className="img-button" /> */}
                    </button>

                    <div className="audio-recorder-container">
                        {status === "recording" ?
                            <div>
                                <audio src={mediaBlobUrl} controls />
                                <div className="pauseContainer">
                                    <button>
                                        <img src={pause} alt="pause" onClick={pauseRecording} />
                                    </button>
                                </div>
                                <div className="recordContainer">
                                    <button>
                                        <img src={record} alt="record" onClick={stopRecording} />
                                    </button>
                                </div>
                            </div>
                            : status === "paused" ?
                                <div>
                                    <audio src={mediaBlobUrl} controls />
                                    <div className="resumeContainer">
                                        <button>
                                            <img src={microphone} alt="micro" onClick={resumeRecording} />
                                        </button>
                                    </div>
                                    <div className="recordContainer">
                                        <button>
                                            <img src={record} alt="record" onClick={stopRecording} />
                                        </button>
                                    </div>
                                </div>
                                : status === "stopped" ?
                                    <div >
                                        <div className="trashContainer">
                                            <button>
                                                <img src={trash} alt="trash" onClick={clearBlobUrl} />
                                            </button>
                                        </div>
                                        <audio src={mediaBlobUrl} controls />
                                        <div className="sendContainer">
                                            <button>
                                                <img src={send} alt="send" onClick={getMessages} />
                                            </button>
                                        </div>
                                    </div>
                                    : <div className="sendContainer">
                                        <button>
                                            <img src={microphone} alt="micro" onClick={startRecording} />
                                        </button>
                                    </div>
                        }
                    </div>
                </form>
                <div className="broomContainer">
                    <img src={broom} alt="broom" className="broom" onClick={resetMessages} />
                </div>
            </div>
        </div>
    );
};

export default MegaBot;
