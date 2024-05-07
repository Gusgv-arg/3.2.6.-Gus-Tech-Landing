import { Link, NavLink } from "react-router-dom"
import { useState } from "react";
import "./NavBar.css"
import "animate.css"

export const NavBar = (props) => {
    const [activeLink, setActiveLink] = useState("");

    const menuItems = ["Sobre Mi"];

    return (
        <>
            <div className="nav-container">
                <div>
                    <Link to="/" >
                        <div className="animate__animated animate__bounceInLeft">
                           <h1 className="megabot">MegaBot<span className="claim"> - Soluciones de IA</span></h1>
                        </div>
                    </Link >
                </div>

                <div className="menu-items">
                    {
                        menuItems.map((item, index) => (

                            <span key={`${item}-${index}`}>
                                <NavLink
                                    className={activeLink === item ? "active-link" : ""}
                                    onClick={() => setActiveLink(item)}
                                    to={`/${menuItems[index]}`}
                                >
                                    {item}
                                </NavLink>
                            </span>
                        ))
                    }
                </div>
            </div>
        </>
    )
}