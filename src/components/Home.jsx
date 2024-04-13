import React from 'react'
import personaje from "../assets/Personaje.jpeg";
import "animate.css"
import MegaBot from './MegaBot';
import "./Home.css"

export const HomeScreen = () => {
	return (
		<div className="homeContainer">
			<div >
				<img
					src={personaje}
					alt="personaje"
					height="330"
					width="330"
					className="animate__animated animate__bounce"
				/>
			</div>
			<div>
				<MegaBot />
			</div>
		</div>
	)
}


