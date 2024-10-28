import React, { useEffect, useState } from 'react'
import personaje from "../assets/Personaje.svg";
import "animate.css"
import "./Home.css"
import MegaBot from './MegaBot';
import axios from 'axios';
import loader from "../assets/UploadingLoop.svg"

const baseURL = process.env.REACT_APP_API_URL_PROD ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;

// Función para "despertar" el servidor usando Axios
const wakeUpServer = async () => {
	try {
		console.log('Intentando conectar con:', baseURL);
		const response = await axios.get(baseURL);
		console.log('Servidor despierto:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error al despertar el servidor:', {
			message: error.message,
			status: error.response?.status,
			baseURL: baseURL
		});
		throw error; // Propagamos el error para manejarlo en el componente
	}
};

export const HomeScreen = () => {

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const initializeApp = async () => {
			const lastLoadingTime = localStorage.getItem('lastLoadingTime');
			const currentTime = Date.now();

			// Si ya se mostró la pantalla de carga en los últimos 10 minutos
			if (lastLoadingTime && (currentTime - parseInt(lastLoadingTime)) < 10 * 60 * 1000) {
				console.log("Carga reciente, saltando pantalla de carga");
				setIsLoading(false);
				return;
			}

			try {
				// Intentamos despertar el servidor
				console.log('Despertando servidor...');
				await wakeUpServer();

				// Guardamos el tiempo de carga
				localStorage.setItem('lastLoadingTime', currentTime.toString());

				// Esperamos un tiempo razonable para que el usuario pueda leer el mensaje
				setTimeout(() => {
					setIsLoading(false);
				}, 20000); // 20 segundos
			} catch (error) {
				console.error('Error durante la inicialización:', error);
				setIsLoading(false); // En caso de error, mostramos la interfaz principal
			}
		};

		initializeApp();
	}, []);

	if (isLoading) {
		return (
			<div className="homeContainer">
				<div className="loading">
					<p><strong>¡Hola bienvenido a Gus-Tech!</strong></p><br />
					<p>Mientras conecto mis cables para ofrecer un buen servicio, le cuento sobre la empresa. En www.gus-tech.com nos especializamos en el desarrollo de Agentes impulsados por Inteligencia Artificial. Estos agentes son previamente entrenados con la información de su empresa y pueden ser provistos de herramientas para realizar las tareas específicas que usted desee.</p><br />
					<p>A continuación lo invito a intercactuar con MegaBot, nuestro Asistente entrenado para responder a sus preguntas sobre las múltiples posibilidades de aplicación para su caso de uso específico.</p><br />
					<p>También podrá probarlo por WhatsApp, Facebook Messenger e Instagram Messenger.</p><br />
					<p>¡Esperamos poder trabajar juntos!</p>
					<span>
						<img
							src={loader}
							alt="loader"
							className="loader"
						/>
					</span>

				</div>
			</div>
		);
	}

	return (
		<div className="homeContainer">
			<div className='personaje'>
				<span className='hola'>¡Hola, soy MegaBot!</span>
				<img
					src={personaje}
					alt="personaje"
					className="animate__animated animate__bounce animate__delay-3s image"
				/>
			</div>
			<div>
				<MegaBot />
			</div>
		</div>
	)
}


