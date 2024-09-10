import React from 'react'
import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from '@tanstack/react-query';

const ChatList = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch(`http://localhost:3000/api/userchats`, {
                credentials: "include"
            }).then((res) =>
                res.json(),
            ),
    })
    console.log(data);


    const textList = [
        "chat list Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dolorum explicabo eius.",
        "eius.",
        "sit amet, consectetur adipisicing",
        "chat list Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dolorum explicabo eius.",
    ]
    return (
        <div className="chatList">
            <span className="title">DASHBOARD</span>
            <Link to="/dashboard">Create a new Chat</Link>
            <Link to="/">Explore Lama AI</Link>
            <Link to="/">Contact</Link>
            <hr />
            <span className="title">RECENT CHATS</span>
            <div className="list">
                {isLoading
                    ? "Loading..."
                    : error
                        ? "Something went wrong!"
                        : data?.map((chat) => (
                            <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                                <p>

                                    {chat.title}
                                    <div className="endLine" />
                                </p>
                            </Link>
                        ))}
            </div>
            <hr />
            <div className="upgrade">
                <img src="/logo.png" alt="" />
                <div className="texts">
                    <span>Upgrade to Lama AI Pro</span>
                    <span>Get unlimited access to all features</span>
                </div>
            </div>
        </div>)
}

export default ChatList