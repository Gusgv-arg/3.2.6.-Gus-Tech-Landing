import React from 'react'
import personaje from "../assets/Personaje.jpeg";
import "animate.css"
import MegaBot from './MegaBot';
import "./Home.css"
import MegaBot2 from './MegaBot2';

export const HomeScreen = () => {
	return (
		<div className="homeContainer">
			<div className='personaje'>
				<img
					src={personaje}
					alt="personaje"					
					className="animate__animated animate__bounce animate__delay-4s image"									
				/>
			</div>
			<div>
				{/* <MegaBot /> */}				
				<MegaBot2 />				
			</div>
		</div>
	)
}


