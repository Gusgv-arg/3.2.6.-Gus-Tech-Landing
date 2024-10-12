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
		const response = await axios.get(baseURL);
		console.log(response.data);
	} catch (error) {
		console.error('Error al despertar el servidor:', error);
	}
};

export const HomeScreen = () => {

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Awaques server
		wakeUpServer();

		// Simulation of time needed to wake up the server.
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 20000);

		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return (
			<div className="homeContainer">
				<div className="loading">
					<p><strong>¡Hola bienvenido a Gus-Tech!</strong></p><br />
					<p>Mientras conecto mis cables para ofrecer un buen servicio, le cuento sobre la empresa. En www.gus-tech.com nos especializamos en la utilización de Agentes impulsados por Inteligencia Artificial. Estos agentes siempre son previamente entrenados con la información y herramientas específicas necesarias para realizar las tareas deseadas.</p><br />
					<p>Con el avance de esta tecnología, las posibilidades son muchas y podríamos decir que se limitan a la imaginación de cada uno. Cosas que hace pocos años atrás parecían impensadas, hoy estamos entrando en una era en donde nuestra interacción con la información se hará de una manera mucho más natural y sencilla.</p><br />
					<p>A continuación podrá intercactuar con MegaBot, nuestro Asistente entrenado para responder a sus preguntas sobre las múltiples posibilidades de aplicación para su caso de uso específico.</p><br />
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


