import React from 'react'
import personaje from "../assets/Personaje.svg";
//import personaje from "../assets/PersonajeAnterior.jpeg";
import "animate.css"
//import MegaBot from './MegaBot';
import "./Home.css"
import MegaBot3 from './MegaBot3';


export const HomeScreen = () => {
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
				{/* <MegaBot/> */}				
						
				 <MegaBot3/>  				
			</div>
		</div>
	)
}


