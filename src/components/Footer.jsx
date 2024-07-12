import "./Footer.css"
import mail from "../assets/mail-in.svg"
import whatsapp from "../assets/WhatsappIcon.svg"
import facebook from "../assets/Facebook.svg"
import instagram from "../assets/Instagram.svg"
import discord from "../assets/Discord.svg"
import linkedin from "../assets/Linkedin.svg"
import calendar from "../assets/FlatTearOffCalendar.svg"
import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <>
          <div className="footerContainer">
            <div className="contactos">
                <span className="text">Contactos:</span>
                <div>
                    <a href="mailto: gusgvillafane@gmail.com" target="_blank" rel="noreferrer" title="Mail: gusgvillafane@gmail.com">
                        <img src={mail} alt="mail" className="mail" />
                    </a>
                </div>
                <div>
                    <a href="https://wa.me/541123429504" target="_blank" rel="noreferrer">
                        <img src={whatsapp} alt="whatsapp" className="whatsapp" />
                    </a>
                </div>
                <div>
                    <a href="https://www.facebook.com/profile.php?id=61560659369776" target="_blank" rel="noreferrer" >
                        <img src={facebook} alt="facebook" className="facebook" />
                    </a>
                </div>
                <div>
                    <Link to="/proximamente" >
                        <img src={instagram} alt="instagram" className="instagram" />
                    </Link>
                </div>
                <div>
                    <a href="https://discord.com/accessibility/#0958" target="_blank" rel="noreferrer" >
                        <img src={discord} alt="discord" className="discord" />
                    </a>
                </div>
                <div>
                    <a href="http://linkedin.com/in/gustavo-gomez-villafañe-6164526" target="_blank" rel="noreferrer" >
                        <img src={linkedin} alt="linkedin" className="linkedin" />
                    </a>
                </div>
            </div>
            <div className="reunionContainer">
                <span className="textReunion">Agendar Reunión:</span>
                <div>
                    <a href="https://calendly.com/gusgvillafane/inteligencia-artificial" target="_blank" rel="noreferrer" title="Agendar Reunión en Google Meet">
                        <img src={calendar} alt="meeting" className="meeting" />
                    </a>
                </div>
            </div>
          </div>
        </>
    )
}