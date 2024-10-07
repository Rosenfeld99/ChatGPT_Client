import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

interface Chat {
    _id: string;
    title: string;
}

interface ChatListProps {
    setIsOPen: (isOpen: boolean) => void;
}

const ChatList: React.FC<ChatListProps> = ({ setIsOPen }) => {
    const { userId } = useAuth();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [editingChat, setEditingChat] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState<string>("");
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery<Chat[], Error>({
        queryKey: ["userChats"],
        queryFn: () =>
            fetch(`https://chatgpt-backend-ggqm.onrender.com/api/userchats/${userId}`, {
                credentials: "include",
            }).then((res) => res.json()),
    });

    const chats = useMemo(() => data ? [...data].reverse() : [], [data]);

    const handleRename = async (chatId: string) => {
        try {
            await fetch(`https://chatgpt-backend-ggqm.onrender.com/api/chats/${userId}/chats/${chatId}/rename`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newTitle })
            });
            setEditingChat(null);
            setNewTitle("");
            queryClient.invalidateQueries(["userChats"]);
        } catch (err) {
            console.error("Error renaming chat:", err);
        }
    };

    const handleDelete = async (chatId: string) => {
        try {
            await fetch(`https://chatgpt-backend-ggqm.onrender.com/api/chats/${userId}/${chatId}`, {
                method: "DELETE"
            });
            queryClient.invalidateQueries(["userChats"]);
        } catch (err) {
            console.error("Error deleting chat:", err);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] ps-5 xl:ps-16 flex-1 pb-4 lg:bg-[#1e1e1e] lg:w-[21.35rem] xl:w-[24.3rem]">
            <span className="font-semibold text-xs mb-2">DASHBOARD</span>
            <Link to="/dashboard" className="p-2 rounded-lg hover:bg-[#3c3c3c]" onClick={() => setIsOPen(false)}>Create a new Chat</Link>
            <Link to="/" className="p-2 rounded-lg hover:bg-[#3c3c3c]" onClick={() => setIsOPen(false)}>Explore CHAT AI</Link>
            <Link to="/" className="p-2 rounded-lg hover:bg-[#3c3c3c]" onClick={() => setIsOPen(false)}>Contact</Link>
            <hr className="border-none h-[2px] bg-gray-300 opacity-10 rounded-lg my-5" />
            <span className="font-semibold text-xs mb-2">RECENT CHATS</span>
            <div className="flex flex-col overflow-y-auto overflow-x-auto flex-1">
                {isLoading ? (
                    <span className='flex items-center gap-5'>Loading... <img loading='lazy' className='w-5 aspect-square' src="/loadingGif.gif" alt="Loading" /></span>
                ) : error ? (
                    "Something went wrong!"
                ) : (
                    chats?.map((chat) => (
                        <div
                            key={chat._id}
                            className="relative rounded-lg hover:bg-[#3c3c3c] mr-4 flex items-center justify-between group"
                        >
                            {editingChat === chat._id ? (
                                <input
                                    type="text"
                                    className="bg-[#3c3c3c] text-white p-1 m-1 rounded-lg flex-grow"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    onBlur={() => handleRename(chat._id)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleRename(chat._id)}
                                    autoFocus
                                />
                            ) : (
                                <div className="flex-grow p-2" onClick={() => { setIsOPen(false); navigate(`/dashboard/chats/${chat._id}`); }}>
                                    {chat.title}
                                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-[#1e1e1e00] via-[#1e1e1e41] to-[#1e1e1e] hover:opacity-0 transition-opacity duration-0" />
                                </div>
                            )}
                            {activeDropdown !== chat._id && !editingChat && (
                                <img
                                    src='https://teledunet.com/icons/home_white.png?if=2'
                                    className="cursor-pointer absolute top-1 right-1 bg-[#3c3c3c] rounded-full w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-0"
                                    onClick={() => setActiveDropdown(activeDropdown === chat._id ? null : chat._id)}
                                />
                            )}
                            {activeDropdown === chat._id && (
                                <div ref={dropdownRef} className="absolute overflow-hidden right-0 mt-8 z-10 p-2 bg-[#2c2c2c] rounded-lg shadow-lg text-white">
                                    <div
                                        className="px-4 py-2 hover:bg-[#3c3c3c] flex items-center justify-between rounded-lg gap-3"
                                        onClick={() => { setEditingChat(chat._id); setNewTitle(chat.title); setActiveDropdown(null); }}
                                    >
                                        Rename
                                        <img src="/edit.png" className=' w-5 aspect-square object-contain' alt="icon delete" />
                                    </div>
                                    <div
                                        className="px-4 py-2 hover:bg-[#3c3c3c] text-[#dc4345] flex items-center justify-between rounded-lg gap-3"
                                        onClick={() => handleDelete(chat._id)}
                                    >
                                        Delete
                                        <img src="/delete.png" className=' w-5 aspect-square object-contain' alt="icon delete" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            <hr className="border-none h-[2px] bg-gray-300 opacity-10 rounded-lg my-5" />
            <div className="mt-auto flex items-center gap-2 text-sm">
                <img loading='lazy' src="/logo.png" alt="logo" className="w-6 h-6" />
                <div className="flex flex-col">
                    <span className="font-semibold">Upgrade to CHAT AI Pro</span>
                    <span className="text-gray-400">Get unlimited access to all features</span>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
