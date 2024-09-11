import React, { useEffect, useRef, useState } from 'react'
import './newPrompt.css'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'
import model from '../../lib/gemini'
import Markdown from "react-markdown";
import { QueryClient, useMutation, } from "@tanstack/react-query"

const NewPrompt = ({ data }) => {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const endRef = useRef()
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    console.log(data);
    

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`http://localhost:3000/api/chats/${data._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: question.length ? question : undefined,
                    answer,
                    img: img.dbData?.filePath || undefined,
                }),
            }).then((res) => res.json());
        },
        onSuccess: () => {
            QueryClient
                .invalidateQueries({ queryKey: ["chat", data._id] })
                .then(() => {
                    setQuestion("");
                    setAnswer("");
                    setImg({
                        isLoading: false,
                        error: "",
                        dbData: {},
                        aiData: {},
                    });
                });
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello" }],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
        ],
        generationConfig: {
            // maxOutputTokens: 1000,
        }
    });

    // const chat = model.startChat({
    //     history: [
    //       data?.history.map(({ role, parts }) => ({
    //         role,
    //         parts: [{ text: parts[0].text }],
    //       })),
    //     ],
    //     generationConfig: {
    //       // maxOutputTokens: 100,
    //     },
    //   });

    useEffect(() => {
        endRef?.current && endRef?.current.scrollIntoView({ behavior: "smooth" })
    }, [data, answer, question, img.dbData])

    const add = async (text, isInitial) => {
        if (!isInitial) setQuestion(text);

        try {
            const result = await chat.sendMessageStream(
                Object.entries(img.aiData).length ? [img.aiData, text] : [text]
            );
            let accumulatedText = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                console.log(chunkText);
                accumulatedText += chunkText;
                setAnswer(accumulatedText);
            }

            mutation.mutate();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (data?.history?.length === 1) {
            add(data.history[0].parts[0].text, true);
        }
    }, [])

    const onSub = async (e) => {
        e.preventDefault();

        const text = e.target.text.value;
        if (!text) return;

        add(text, false);
        e.target.text.value = ""
    };

    return (
        <div>
            {img.isLoading && <div className="">Loading...</div>}
            {img.dbData?.filePath && (
                <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={img.dbData?.filePath}
                    width="380"
                    transformation={[{ width: 380 }]}
                />
            )}
            {question && <div className='message user'>{question}</div>}
            {answer && <div className='message'>          <Markdown>{answer}</Markdown>
            </div>}
            <div ref={endRef} className="endChat" />
            <form onSubmit={onSub} className="newForm">
                <Upload setImg={setImg} />
                <input id="file" type="file" multiple={false} hidden />
                <input type="text" name="text" placeholder="Ask anything..." />
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </div>
    )
}

export default NewPrompt