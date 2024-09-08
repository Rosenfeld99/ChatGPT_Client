import React, { useEffect, useRef, useState } from 'react'
import './newPrompt.css'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'
import model from '../../lib/gemini'
import Markdown from "react-markdown";

const NewPrompt = () => {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const endRef = useRef()
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
    });

    useEffect(() => {
        endRef?.current && endRef?.current.scrollIntoView({ behavior: "smooth" })
    }, [answer,question,img.dbData])

    const add = async (text) => {
        setQuestion(text)

        const result = await model.generateContent(text);
        setAnswer(result.response.text());
    }

    const onSub = async (e) => {
        e.preventDefault();

        const text = e.target.text.value

        if (!text) {
            return
        }

        add(text)
    }

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