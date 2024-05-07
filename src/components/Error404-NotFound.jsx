import React from 'react'
import { Link } from 'react-router-dom'
import "./Error404.css"

export const Error404 = () => {
    return (
        <div className='error404'>
            <div>
                <h1 className='error'>ERROR, página no encontrada.</h1>
            </div>
            <div>
                <Link to="/">
                    <button className='errorButton'>Volver</button>
                </Link>
            </div>
        </div>
    )
}
