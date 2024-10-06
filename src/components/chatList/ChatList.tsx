import React from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

interface Chat {
    _id: string;
    title: string;
}

interface ChatListProps {
    setIsOPen: (isOpen: boolean) => void;
    isOPen: boolean;
}

const ChatList: React.FC<ChatListProps> = ({ setIsOPen, isOPen }) => {
    const { userId } = useAuth();

    const { isLoading, error, data } = useQuery<Chat[], Error>({
        queryKey: ["userChats"],
        queryFn: () =>
            fetch(`https://chatgpt-backend-ggqm.onrender.com/api/userchats/${userId}`, {
                credentials: "include",
            }).then((res) => res.json()),
    });

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] ps-5 xl:ps-16 flex-1 pb-4 lg:bg-[#1e1e1e] lg:w-[21.35rem] xl:w-[24.3rem]">
            <span className="font-semibold text-xs mb-2">DASHBOARD</span>
            <Link to="/dashboard" className="p-2 rounded-lg hover:bg-[#3c3c3c]" onClick={() => setIsOPen && setIsOPen(false)}>Create a new Chat</Link>
            <Link to="/" className="p-2 rounded-lg hover:bg-[#3c3c3c]" onClick={() => setIsOPen && setIsOPen(false)}>Explore CHAT AI</Link>
            <Link to="/" className="p-2 rounded-lg hover:bg-[#3c3c3c]" onClick={() => setIsOPen && setIsOPen(false)}>Contact</Link>
            <hr className="border-none h-[2px] bg-gray-300 opacity-10 rounded-lg my-5" />
            <span className="font-semibold text-xs mb-2">RECENT CHATS</span>
            <div className="flex flex-col overflow-y-auto overflow-x-auto flex-1">
                {isLoading ? (
                    <span className='flex items-center gap-5'>Loading... <img loading='lazy' className='w-5 aspect-square' src="/loadingGif.gif" alt="Loading" /></span>
                ) : error ? (
                    "Something went wrong!"
                ) : data?.length > 0 ? (
                    data.reverse().map((chat) => (
                        <Link
                            onClick={() => setIsOPen && setIsOPen(false)}
                            className="relative p-2 rounded-lg hover:bg-[#3c3c3c] mr-4"
                            to={`/dashboard/chats/${chat._id}`}
                            key={chat._id}
                        >
                            {chat.title}
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-[#1e1e1e00] via-[#1e1e1e41] to-[#1e1e1e] hover:opacity-0 transition-opacity duration-300" />
                        </Link>
                    ))
                ) : null}
            </div>
            <hr className="border-none h-[2px] bg-gray-300 opacity-10 rounded-lg my-5" />
            <div className="mt-auto flex items-center gap-2 text-sm">
                <img loading='lazy' src="/logo.png" alt="" className="w-6 h-6" />
                <div className="flex flex-col">
                    <span className="font-semibold">Upgrade to CHAT AI Pro</span>
                    <span className="text-gray-400">Get unlimited access to all features</span>
                </div>
            </div>
        </div>
    );
}

export default ChatList;
