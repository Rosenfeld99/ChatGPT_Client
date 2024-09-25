import React from 'react'
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

const ChatList = ({ setIsOPen, isOPen }) => {
    const { userId } = useAuth()
    console.log(userId);

    const { isLoading, error, data } = useQuery({
        queryKey: ["userChats"],
        queryFn: () =>
            fetch(`http://localhost:3000/api/userchats`, {
                credentials: "include",
            }).then((res) => res.json()),
    });
    console.log(data);

    console.log(isOPen);


    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] ps-5 xl:ps-16 flex-1 pb-4 lg:bg-[#1e1e1e] lg:w-[21.35rem] xl:w-[24.1rem]">
            <span className="font-semibold text-xs mb-2">DASHBOARD</span>
            <Link to="/dashboard" className="p-2 rounded-lg hover:bg-[#3c3c3c]" onClick={() => setIsOPen && setIsOPen(false)}>Create a new Chat</Link>
            <Link to="/" className="p-2 rounded-lg hover:bg-[#3c3c3c]" onClick={() => setIsOPen && setIsOPen(false)}>Explore CHAT AI</Link>
            <Link to="/" className="p-2 rounded-lg hover:bg-[#3c3c3c]" onClick={() => setIsOPen && setIsOPen(false)}>Contact</Link>
            <hr className="border-none h-[2px] bg-gray-300 opacity-10 rounded-lg my-5" />
            <span className="font-semibold text-xs mb-2">RECENT CHATS</span>
            <div className="flex flex-col overflow-y-auto overflow-x-auto flex-1">
                {isLoading
                    ? <span className=' flex items-center gap-5'>Loading... <img className='w-5 aspect-square' src="https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif" alt="" /></span>
                    : error
                        ? "Something went wrong!"
                        : data?.length > 0 && data?.reverse()?.map((chat) => (
                            <Link
                                onClick={() => setIsOPen && setIsOPen(false)}
                                className="relative p-2 rounded-lg hover:bg-[#3c3c3c] mr-4"
                                to={`/dashboard/chats/${chat._id}`}
                                key={chat._id}
                            >
                                {chat.title}
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-[#1e1e1e00] via-[#1e1e1e41] to-[#1e1e1e] hover:opacity-0 transition-opacity duration-300" />
                            </Link>
                        ))}
            </div>
            <hr className="border-none h-[2px] bg-gray-300 opacity-10 rounded-lg my-5" />
            <div className="mt-auto flex items-center gap-2 text-sm">
                <img src="/logo.png" alt="" className="w-6 h-6" />
                <div className="flex flex-col">
                    <span className="font-semibold">Upgrade to CHAT AI Pro</span>
                    <span className="text-gray-400">Get unlimited access to all features</span>
                </div>
            </div>
        </div>
    );

}

export default ChatList