"use client";

import { Loader, Send } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import MarkdownRenderer from "@/components/markdown-renderer";
import { useChat } from "@ai-sdk/react";


const GroqAI = () => {

  const messageEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat/groq",
  });


  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-svh items-center justify-between h-screen sm:p-3 lg:px-52 overflow-y-hidden pissoff">
      <div ref={messageEndRef} className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-r from-red-950/90 via-neutral-950 to-red-950/90 bg-opacity-90 backdrop-blur-md sm:rounded-lg overflow-y-auto scroll-smooth"
        style={{
          scrollbarColor: 'rgba(255, 0, 0, 0.406)', borderRadius: '10px',
          scrollbarWidth: 'thin'
        }}
      >
        {messages.length === 0 ? (
          <>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-gray-300 text-xl sm:text-2xl text-center tracking-wide font-bold mb-2">
                Start chatting with your favorite
              </h1>
              <h1 className="text-gray-300 text-xl sm:text-2xl tracking-wide font-bold">
                <span className="text-transparent bg-gradient-to-br from-orange-500 via-red-500 to-red-600 bg-clip-text text-4xl sm:text-5xl">Groq</span>.AI here !!
              </h1>

              <Image
                src="/robot.png"
                width={300}
                height={300}
                alt="Groq AI"
                className="mt-8 scale-90 hover:scale-105 transition-all duration-500 ease-in-out robot"
              />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col text-white">
            <div className="flex-1 p-4">
              {messages.map((message, index) => (
                <div
                  className={`chat ${message.role === "assistant"
                    ? "chat-start"
                    : "chat-end"
                    }`}
                  key={index}
                >
                  <div className="chat-image avatar">
                    <div className="w-0 sm:w-10 rounded-full">
                      <Image
                        width={500}
                        height={500}
                        alt={`${message.role === "assistant" ? "Tony" : "User"
                          } Avatar`}
                        src={
                          message.role === "assistant"
                            ? "/tony.webp"
                            : "/user.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1">
                    {message.role === "assistant" ? "Tony" : "User"}
                  </div>
                  <div
                    className={`chat-bubble max-w-full sm:max-w-3xl ${message.role === "assistant"
                      ? "bg-[#ff8282] text-black"
                      : "bg-neutral-950 text-white"
                      }`}
                  >
                    <MarkdownRenderer content={message.content} assisstant={
                      message.role === "assistant" ? "Tony" : "User"
                    } />
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col items-start justify-center h-20 mt-5">
        <form
          className="w-full flex items-center bg-gradient-to-r from-red-950/90 via-neutral-950 to-red-950/90 backdrop-blur-md rounded-md px-4 py-2 mb-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true); // Set loading to true immediately
            await handleSubmit(); // Assuming handleSubmit is async and returns a promise
            setLoading(false); // Set loading to false after handleSubmit completes
          }}
        >
          <input
            name="prompt"
            value={input}
            autoComplete="off"
            onChange={handleInputChange}
            id="input"
            placeholder="Enter your prompt"
            className="bg-transparent text-white outline-none flex-grow"
            disabled={loading}
          />
          <button
            type="submit"
            className={`bg-red-500 flex justify-center items-center gap-2 text-white px-4 py-2 rounded-md ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {
              loading ? <Loader className="animate-spin" size={24} /> :
                <>
                  Send
                  <Send size={24} />
                </>
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default GroqAI
