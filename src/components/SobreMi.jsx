import React, { useEffect } from 'react'
import "./SobreMi.css"
import { useGlobalState } from "../utils/GlobalStateContext"

const SobreMi = () => {

  // Access Global State && changed displayed propertie to true
  const { messages, setMessages } = useGlobalState();

  useEffect(() => {
    if (messages && messages.length > 0) {
      const updatedMessages = [...messages];
      updatedMessages[updatedMessages.length - 1].displayed = true;
      setMessages(updatedMessages);
    }
  }, []);

  return (
    <div className="sobremi">

      <p>
        Hola, mi nombre es Gustavo Gómez Villafañe de Argentina. Soy Licenciado en Administración de Empresas con una Maestría en Administración y Desarrollador especializado en Inteligencia Artificial.
      </p>
      <p>
        Trabajé más de 25 años en multinacionales del rubro automotriz, en donde ocupé diversos puestos en el área comercial llegando a ocupar puestos de Gerencia en Desarrollo de Red y en Calidad de Servicio.
      </p>
      <p>
        En los comienzos de mi carrera profesional, también estudié programación y pude comprobar los beneficios de la tecnología aplicada a los procesos logrando automatizar muchas tareas en mi puesto de trabajo.
      </p>
      <p>
        Mi carrera siguió, y ahora como emprendedor independiente, hace más de 2 años retomé mi pasión por la Programación teniendo que actualizarme en las nuevas tecnologías.
      </p>
      <p>
        Durante los años 2000 Internet provocó una revolución y cambió todo para siempre. Hoy, y más allá de las opiniones o gustos, el mundo va hacia el uso masivo de la Inteligencia Artificial y ya está provocando una nueva revolución en las industrias.
      </p>
      <p>
        Ante este nuevo escenario, los que así lo entiendan y tomen acciones serán los ganadores. Si este es su caso, puede contar conmigo para ayudarlo en ese proceso aportando toda mi formación y experiencia que van más allá del uso de la tecnología.
      </p>
      <p>¡Nos vemos!</p>
      <br />

    </div>
  )
}

export default SobreMi