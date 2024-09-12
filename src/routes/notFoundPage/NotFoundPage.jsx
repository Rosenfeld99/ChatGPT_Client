import React from 'react'
import { Link } from 'react-router-dom'
import "./NotFoundPage.css"

const NotFoundPage = () => {
    return (
        <div className='pageNotFound'>
            <img className='imageNotFound' src="/pageNotFound404.png" alt="" />
            <Link className='btnBackHome' to="/">Back Home</Link>
        </div>
    )
}

export default NotFoundPage