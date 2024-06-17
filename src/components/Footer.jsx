import "./Footer.css"
import mail from "../assets/mail-in.svg"
import whatsapp from "../assets/WhatsappIcon.svg"
import meeting from "../assets/GoogleMeet.svg"
import facebook from "../assets/Facebook.svg"
import instagram from "../assets/Instagram.svg"
import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <>
            <div className="contactos">
                <span className="text">Contactos:</span>

                <div>
                    <a href="mailto: gusgvillafane@gmail.com" target="_blank" rel="noreferrer" title="Mail: gusgvillafane@gmail.com">
                        <img src={mail} alt="mail" className="mail" />
                    </a>
                </div>
                <div>
                    <a href="https://wa.me/5491161405589" target="_blank" rel="noreferrer">
                        <img src={whatsapp} alt="whatsapp" className="whatsapp" />
                    </a>
                </div>
                <div>
                    <a href="https://calendly.com/gusgvillafane/inteligencia-artificial" target="_blank" rel="noreferrer" title="Reunión en Google Meet">
                        <img src={meeting} alt="meeting" className="meeting" />                    
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
            </div>
        </>
    )
}