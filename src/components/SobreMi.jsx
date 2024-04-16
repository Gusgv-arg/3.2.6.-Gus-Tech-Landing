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

  /* const updatedMessages = JSON.parse(localStorage.getItem('messages'));

  if (updatedMessages) {
    updatedMessages[updatedMessages.length - 1].displayed = true;
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  } */

  return (
    <div className='nosotros'>Nosotros</div>
  )
}

export default SobreMi