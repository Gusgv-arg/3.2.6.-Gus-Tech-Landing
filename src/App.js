import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import chatbot from "./assets/Chatbot con headphones fondo blanco.jpeg";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenuItem,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
} from "@nextui-org/react";
import { Link as NextUILink } from "@nextui-org/react";
import { HomeScreen } from "./components/Home";
import ContactForm from "./components/ContactForm";
import Nosotros from "./components/Nosotros";
import { Error404 } from "./components/Error404-NotFound";

export default function App() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [activeLink, setActiveLink] = React.useState("");

	const menuItems = ["Nosotros", "Contacto"];

	return (
		<>
			<Navbar onMenuOpenChange={setIsMenuOpen}>
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="sm:hidden"
					/>
					<NavbarBrand>
						<Link to="/">
							<div className="flex items-center">
								<img
									src={chatbot}
									alt="chatbot"
									fill="none"
									height="36"
									viewBox="0 0 32 32"
									width="36"
								/>
								<p className="font-bold text-inherit ml-2">MegaBot</p>
							</div>
						</Link>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					<NavbarItem>
						<NextUILink
							href="/nosotros"
							className={activeLink === "Nosotros" ? "active-link" : ""}
							color={activeLink === "Nosotros" ? "success" : "foreground"}
							onClick={() => setActiveLink("Nosotros")}
						>
							Nosotros
						</NextUILink>
					</NavbarItem>
					<NavbarItem>
						<NextUILink
							href="/contacto"
							className={activeLink === "Contacto" ? "active-link" : ""}
							color={activeLink === "Contacto" ? "success" : "foreground"}
							onClick={() => setActiveLink("Contacto")}
						>
							Contacto
						</NextUILink>
					</NavbarItem>
				</NavbarContent>

				<NavbarMenu>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<NextUILink
								className={activeLink === item ? "active-link w-full" : ""}
								color={activeLink === item ? "success" : "foreground"}
								onClick={() => setActiveLink(item)}
								href="#"
								size="lg"
							>
								{item}
							</NextUILink>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>
			<main>
				<Routes>
					<Route exact path="/" element={<HomeScreen />} />
					<Route path="/contacto" element={<ContactForm />} />
					<Route path="/nosotros" element={<Nosotros />} />
					<Route path="*" element={<Error404 />} />
				</Routes>
			</main>
		</>
	);
}
