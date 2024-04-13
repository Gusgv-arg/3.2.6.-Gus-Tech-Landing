import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "./components/Home";
import ContactForm from "./components/ContactForm";
import Nosotros from "./components/Nosotros";
import { Error404 } from "./components/Error404-NotFound";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import "./App.css"

export default function App() {
	return (
		<>
			<div className="screen">
				<header className="navbar">
					<NavBar />
				</header>

				<main className="content" >
					<Routes >
						<Route exact path="/" element={<HomeScreen />} />
						<Route path="/contacto" element={<ContactForm />} />
						<Route path="/nosotros" element={<Nosotros />} />
						<Route path="*" element={<Error404 />} />
					</Routes>
				</main>

				<footer className="footer">
					<Footer/>
				</footer>
			</div>
		</>
	);
}
