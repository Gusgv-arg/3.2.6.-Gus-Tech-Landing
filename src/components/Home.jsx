import React from 'react'
import personaje from "../assets/Personaje.svg";
//import personaje from "../assets/PersonajeAnterior.jpeg";
import "animate.css"
import MegaBot from './MegaBot';
import "./Home.css"

export const HomeScreen = () => {
	return (
		<div className="homeContainer">
			<div className='personaje'>
				<img
					src={personaje}
					alt="personaje"					
					className="animate__animated animate__bounce animate__delay-3s image"									
				/>
			</div>
			<div>				
				<MegaBot/>				
			</div>
		</div>
	)
}


