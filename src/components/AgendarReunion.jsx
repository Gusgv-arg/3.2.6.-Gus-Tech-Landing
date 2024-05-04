import React from 'react'
import "./AgendarReunion.css"
import Calendly from './Calendly';

export const AgendarReunion = () => {

	return (
		<div className="reunion">
			{/* <div className=''>
				<h3>Podes agendar una reunión en Google Meet para conocer mas</h3>
			</div> */}
			<div>
				<Calendly url="https://calendly.com/gusgvillafane/30min" />
				{/* <Calendly url="https://calendly.com/gusgvillafane" /> */}
				
			</div>
		</div>
	);
};
