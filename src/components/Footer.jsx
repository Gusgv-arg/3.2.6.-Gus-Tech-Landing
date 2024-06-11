import "./Footer.css"
import mail from "../assets/mail-in.svg"
import whatsapp from "../assets/WhatsappIcon.svg"
import meeting from "../assets/GoogleMeet.svg"
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
            </div>
        </>
    )
}