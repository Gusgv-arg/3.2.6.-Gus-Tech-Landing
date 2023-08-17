import React from "react";
import chatbot from "./assets/Chatbot con headphones fondo blanco.jpeg";
import personaje from "./assets/Personaje.jpeg";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenuItem,
	NavbarItem,
	Link,
	NavbarMenuToggle,
	NavbarMenu,
} from "@nextui-org/react";
import { AcmeLogo } from "./components/AcmeLogo.jsx";

export default function App() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [activeLink, setActiveLink] = React.useState("");

	const menuItems = ["Beneficios", "Clientes", "Integraciones"];

	return (
		<>
			<Navbar onMenuOpenChange={setIsMenuOpen}>
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="sm:hidden"
					/>
					<NavbarBrand>
						<img
							src={chatbot}
							alt="chatbot"
							fill="none"
							height="36"
							viewBox="0 0 32 32"
							width="36"
						/>
						<p className="font-bold text-inherit ml-2"> ChatBot IA</p>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					<NavbarItem>
						<Link
							className={activeLink === "Beneficios" ? "active-link" : ""}
							color={activeLink === "Beneficios" ? "success" : "foreground"}
							onClick={() => setActiveLink("Beneficios")}
							href="#"
						>
							Beneficios
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link
							href="#"
							className={activeLink === "Clientes" ? "active-link" : ""}
							color={activeLink === "Clientes" ? "success" : "foreground"}
							onClick={() => setActiveLink("Clientes")}
						>
							Clientes
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link
							className={activeLink === "Integraciones" ? "active-link" : ""}
							color={activeLink === "Integraciones" ? "success" : "foreground"}
							onClick={() => setActiveLink("Integraciones")}
							href="#"
						>
							Integraciones
						</Link>
					</NavbarItem>
				</NavbarContent>

				<NavbarMenu>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								className={activeLink === item ? "active-link w-full" : ""}
								color={activeLink === item ? "success" : "foreground"}
								onClick={() => setActiveLink(item)}
								href="#"
								size="lg"
							>
								{item}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>
			<div className="flex mt-20 ">
				<img
					src={personaje}
					alt="personaje"
					height="336"
					viewBox="100 0 32 32"
					width="336"
					className="mx-20"
				/>				
				<p className="max-w-xs -ml-16 bg-slate-50 h-72 p-3 rounded-xl bg-slate-600 text-white text-center"><strong>HOLA!</strong><br/>Soy un ChatBot de Inteligencia Artificial. Te invito a conversar haciendome las preguntas que creas necesarias para entender como los Chatbots de IA te pueden ayudar en tu negocio para dar soporte a tu clientes!<br/><br/><strong>Hacé click en el ícono de abajo a la derecha 👇</strong></p>
			</div>
		</>
	);
}
