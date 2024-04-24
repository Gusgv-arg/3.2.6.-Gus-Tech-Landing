
import React from 'react'
import { Link } from 'react-router-dom'

export const Error404 = () => {
    return (
        <div className='error404'>
            <div>
                <h1>ERROR 404. Página no encontrada</h1>
            </div>
            <div>
                <Link to="/">
                    <button>Volver</button>
                </Link>
            </div>
        </div>
    )
}
