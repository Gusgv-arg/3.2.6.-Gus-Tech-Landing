import React from 'react'
import "./SobreMi.css"

const SobreMi = () => {
  const updatedMessages = JSON.parse(localStorage.getItem('messages'));
  
  if (updatedMessages) {
    updatedMessages[updatedMessages.length - 1].displayed = true;
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  } 
  
  return (
    <div className='nosotros'>Nosotros</div>
  )
}

export default SobreMi