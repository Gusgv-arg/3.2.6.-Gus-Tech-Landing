import "./Footer.css"

export const Footer = () => {
    return (
        <>
            <div className="contactos">
                <div>
                    <a href="mailto: gusgvillafane@gmail.com" target="_blank" rel="noreferrer">
                        <i className="far fa-envelope icon" />
                        gusgvillafane@gmail.com
                    </a>
                </div>
                <div>
                    <a href="https://wa.me/5491161405589" target="_blank" rel="noreferrer">
                        <i className="fab fa-whatsapp whatsapp icon" />
                        +54911 61405589
                    </a>
                </div>
                <div>
                    <a href="https://calendly.com/gusgvillafane/inteligencia-artificial" target="_blank" rel="noreferrer">
                        Agendar Reunión
                    </a>
                </div>
            </div>
        </>
    )
}