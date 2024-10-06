import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <img loading='lazy' className="w-[500px] md:w-[250px]" src="/pageNotFound404.png" alt="Page Not Found" />
            <Link
                to="/"
                className="px-6 py-4 bg-[#217bfe] text-white rounded-2xl text-sm mt-5 transition-transform duration-300 ease-in-out hover:bg-white hover:text-[#217bfe] hover:scale-110"
            >
                Back Home
            </Link>
        </div>
    );
}

export default NotFoundPage