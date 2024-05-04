import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "./components/Home";
import { Error404 } from "./components/Error404-NotFound";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import "./App.css";
import SobreMi from "./components/SobreMi";
import { AgendarReunion } from "./components/AgendarReunion";

export default function App() {
				
	return (
		<>
			<div className="grid">
				<header className="navbar">
					<NavBar />
				</header>

				<main className="content">
					<Routes>
						<Route exact path="/" element={<HomeScreen />} />
						<Route path="/agendar reunión" element={<AgendarReunion />} />
						<Route path="/sobre mi" element={<SobreMi />} />
						<Route path="*" element={<Error404 />} />
					</Routes>
				</main>

				<footer>
					<Footer />
				</footer>
			</div>
		</>
	);
}
