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

      <div className='contenido'>
        <p>
          Hola, mi nombre es Gustavo Gómez Villafañe de Argentina. Soy Licenciado en Administración de Empresas con un MBA y Desarrollador especializado en Inteligencia Artificial.
        </p>
        <p>
          Trabajé más de 25 años en multinacionales del rubro automotriz, en donde ocupé diversos puestos en el área comercial llegando a puestos gerenciales como Director de Desarrollo de Red y Calidad de Citroen o Director de Desarrollo de Red de Peugeot, Citroen y DS.
        </p>
        <p>
          En los comienzos de mi carrera profesional, con 22 años y trabajando en el área de Costos y Precios de Repuestos, comencé a estudiar programación y comprobar los beneficios de la tecnología aplicada a los procesos. De estar en un puesto de mucho trabajo manual, logré automatizarlo y transformarlo a un puesto de análisis de la información facilitando la toma de decisiones.
        </p>
        <p>
          Mi carrera siguió, y ahora como emprendedor independiente, hace 2 años retomé mi pasión por la Programación teniendo que actualizarme en las nuevas tecnologías.
        </p>
        <p>
          Durante los años 2000 Internet provocó una revolución y cambió todo para siempre. Hoy, y más allá de las opiniones o gustos, el mundo va hacia el uso masivo de la Inteligencia Artificial y ya está provocando una nueva revolución en las industrias.
        </p>
        <p>
          Considero que es momento de actuar rápido ante este nuevo escenario; y para esto estoy preparado para ayudar a las empresas en ese proceso de cambio aportando mi formación y experiencia.
        </p>
        <br />
      </div>
    </div>
  )
}

export default SobreMi