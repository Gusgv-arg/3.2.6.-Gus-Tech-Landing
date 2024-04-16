import React, { useEffect } from 'react';
import "./Calendly.css"

const Calendly = ({ url, style }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="calendly-inline-widget" data-url={url} style={style}></div>
    </div>
  );
};

export default Calendly;



