import React, { useEffect, useRef } from 'react'
import './newPrompt.css'

const NewPrompt = () => {
    const endRef = useRef()

  useEffect(() => {
    endRef?.current && endRef?.current.scrollIntoView({ behavior: "smooth" })
  }, [])

    return (
        <div>
            <div ref={endRef} className="endChat"/>
            <form className="newForm" onSubmit={''}>
                <label htmlFor="file">
                    <img src="/attachment.png" alt="attachment button" />
                </label>
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