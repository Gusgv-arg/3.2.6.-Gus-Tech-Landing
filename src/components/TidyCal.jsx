import React, { useEffect, useRef } from 'react';

const TidyCal = ({ path }) => {
  const divRef = useRef(null); // Referencia para acceder al div del DOM

  useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, 500); // Espera medio segundo antes de cargar el script
  
    return () => {
      clearTimeout(timer);
    };
  }, [path]);
  

  return (
    <div ref={divRef} className="tidycal-embed" data-path={path}></div>
  );
};

export default TidyCal;

