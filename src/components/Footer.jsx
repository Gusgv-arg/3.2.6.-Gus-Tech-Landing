import "./Footer.css"

export const Footer = () => {
    return (
        <>
            <div className="contactos">
                <p>Contactos:</p>
                <p>
                    <a href="mailto: gusgvillafane@gmail.com">
                        <i className="far fa-envelope" />{" "}
                        gusgvillafane@gmail.com
                    </a>
                </p>
                <p>
                    <a href="https://wa.me/5491161405589" target="_blank" rel="noreferrer">
                        <i className="fab fa-whatsapp whatsapp" />{" "}
                        +54911 61405589
                    </a>
                </p>
                <p>
                    {/* Tidy Cal no ofrece en la version gratis el link de Google meet */}
                    {/* <a href="https://tidycal.com/gusgvillafane" target="_blank" rel="noreferrer">
                        Agendar Reunión
                    </a> */}
                    <a href="https://calendly.com/gusgvillafane/inteligencia-artificial" target="_blank" rel="noreferrer">
                        Agendar Reunión
                    </a>
                </p>
            </div>
        </>
    )
}