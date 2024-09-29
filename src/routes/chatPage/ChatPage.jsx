import NewPrompt from '../../components/newPrompt/NewPrompt';
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import React from 'react';
import { useAuth } from '@clerk/clerk-react';

const ChatPage = () => {
  const { userId } = useAuth()

  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`https://chatgpt-backend-ggqm.onrender.com/api/chats/${chatId}/${userId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="h-[calc(100%-1rem)] md:h-[calc(100%-2rem)] overflow-hidden flex flex-col items-center relative">
      <div className="flex-1 pt-12 w-full overflow-auto flex justify-center rounded-2xl bg-[#252526]">
        <div className="w-full md:w-[80%] 2xl:w-1/2 px-5 md:px-0 flex flex-col gap-5 py-4">
          {isPending
            ? <span className=' flex items-center gap-5'>Loading... <img loading='lazy' className='w-5 aspect-square' src="/loadingGif.gif" alt="" /></span>
            : error
              ? <span>Something went wrong!</span>
              : data?.history?.map((message, i) => (
                <React.Fragment key={i}>
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      className='my-2 self-end'
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div
                    className={` ${message.role === "user"
                      ? "bg-[#1e1e1e] rounded-2xl px-5 max-w-[80%] self-end py-2"
                      : "  max-w-[80%] px-3"
                      }`}
                  >
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </React.Fragment>
              ))}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );

}

export default ChatPage