import React from 'react'
import personaje from "../assets/Personaje.jpeg";
import "animate.css"
import MegaBot from './MegaBot';

export const HomeScreen = () => {
	return (
		<div className="homeContainer">
			<div >
				<img
					src={personaje}
					alt="personaje"
					height="330"
					viewBox="100 0 32 32"
					width="330"
					className="mx-20 animate__animated animate__bounce"
				/>
			</div>
			<div>
				<MegaBot />
			</div>
		</div>
	)
}


