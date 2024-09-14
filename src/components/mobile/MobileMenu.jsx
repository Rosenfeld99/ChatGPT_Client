import React, { useState } from "react";
import ChatList from "../chatList/ChatList";

const MobileMenu = () => {
    const [isOPen, setIsOPen] = useState(false);

    return (
        <div className=" lg:hidden">
            <div
                onClick={() => setIsOPen(!isOPen)}
                className=" flex flex-col cursor-pointer gap-[4.5px] z-40 relative"
            >
                <div
                    className={` w-6 h-1 bg-blue-500 rounded-sm ${isOPen ? "rotate-45" : ""
                        } origin-left ease-in-out duration-300`}
                />
                <div
                    className={` w-6 h-1 bg-blue-500 rounded-sm ${isOPen ? "opacity-0" : ""
                        } ease-in-out duration-300`}
                />
                <div
                    className={` w-6 h-1 bg-blue-500 rounded-sm ${isOPen ? "-rotate-45" : ""
                        } origin-left ease-in-out duration-300`}
                />
            </div>

            {/* Is open`*/}
            {isOPen && (
                <div className=" absolute left-0 top-0 h-full z-10 bg-[#1e1e1e] pt-20 border-r-[1px] border-r-[#313131] pl-5 pb-5">
                    <ChatList setIsOPen={setIsOPen} isOPen={isOPen} />
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
