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
            </div>
        </>
    )
}