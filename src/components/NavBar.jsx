import { Link } from "react-router-dom"
import chatbot from "../assets/Chatbot con headphones fondo blanco.jpeg";
import { useState } from "react";
import "./NavBar.css"

export const NavBar = (props) => {
    const [activeLink, setActiveLink] = useState("");

    const menuItems = ["Nosotros"];

    return (
        <>
            <div className="nav-container">
                <div>
                    <Link to="/" >
                        <div className="">
                            <img
                                src={chatbot}
                                alt="chatbot"           
                            />
                            <span>MegaBot</span>
                        </div>
                    </Link >
                </div>

                <div className="menu-items">
                    {
                        menuItems.map((item, index) => (
                            <span key={`${item}-${index}`}>
                                <Link
                                    className={activeLink === item ? "active-link" : ""}
                                    onClick={() => setActiveLink(item)}
                                    to={`/${menuItems[index]}`}
                                >
                                    {item}
                                </Link>
                            </span>
                        ))
                    }
                </div>
            </div>
        </>
    )
}