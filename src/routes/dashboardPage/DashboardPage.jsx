import React from 'react'
// import "./dashboardPage.css";
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query'


const DashboardPage = () => {
  const queryClient = useQueryClient()
  const navigation = useNavigate()

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`http://localhost:3000/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const onSub = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };

  return (
    <div className="h-[calc(100%-1rem)] md:h-[calc(100%-2rem)] px-5 md:px-0 flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full md:w-[80%] 2xl:w-1/2 gap-12">
        <div className="flex items-center gap-5 opacity-20 hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <img src="/logo.png" alt="" className="w-16 h-16" />
          <h1 className="text-6xl font-semibold bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent">CHAT AI</h1>
        </div>
        <div className="w-full flex items-center flex-wrap md:flex-nowrap justify-between gap-12">
          <div className="flex-1 hidden sm:flex flex-col items-start gap-2 font-light text-sm p-2 md:p-5 border border-[#555] rounded-2xl transition-colors duration-300 ease-in-out whitespace-nowrap hover:opacity-50 hover:bg-[#555]">
            <img src="/chat.png" alt="" className="w-10 h-10 object-cover" />
            <span>Create a New Chat</span>
          </div>
          <div className="flex-1 flex flex-col items-start gap-2 font-light text-sm p-2 md:p-5 border border-[#555] rounded-2xl transition-colors duration-300 ease-in-out whitespace-nowrap hover:opacity-50 hover:bg-[#555]">
            <img src="/image.png" alt="" className="w-10 h-10 object-cover" />
            <span>Analyze Images</span>
          </div>
          <div className="flex-1 flex flex-col items-start gap-2 font-light text-sm p-2 md:p-5 border border-[#555] rounded-2xl transition-colors duration-300 ease-in-out whitespace-nowrap hover:opacity-50 hover:bg-[#555]">
            <img src="/code.png" alt="" className="w-10 h-10 object-cover" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full md:w-[80%] 2xl:w-1/2 bg-[#1e1e1e] rounded-2xl flex">
        <form onSubmit={onSub} className="w-full h-full flex items-center justify-between gap-5 mb-2">
          <input
            type="text"
            name="text"
            placeholder="Ask me anything..."
            className="flex-1 py-3 pl-5 bg-transparent border-none outline-none text-[#ececec]"
          />
          <button className="bg-[#605e68] rounded-full border-none cursor-pointer p-2 flex items-center justify-center mr-5">
            <img src="/arrow.png" alt="" className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );

}

export default DashboardPage