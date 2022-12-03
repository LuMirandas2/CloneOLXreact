import React from 'react'
import { Link } from 'react-router-dom'
import { NotFoundArea } from './styled'

const Page = () => {
    return (
        <NotFoundArea>
        <div className="container"> 
            <h2>Página não encontrada</h2>
            <Link to='/'>Voltar para a Home</Link>
        </div>
        </NotFoundArea>
    )
}

export default Page