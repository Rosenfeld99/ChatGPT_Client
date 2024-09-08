import "./chatPage.css";
import NewPrompt from '../../components/newPrompt/NewPrompt';

const ChatPage = () => {

  const history = [
    { message: "some text", role: "user" },
    { message: "some text form ai", role: "" },
    { message: "some text", role: "user" },
    { message: "some text form ai", role: "" },
    { message: "some text", role: "user" },
    { message: "some text form ai", role: "" },
    { message: "some text", role: "user" },
    { message: "some text form ai", role: "" },
    { message: "some text", role: "user" },
    { message: "some text form ai", role: "" },
    { message: "some text", role: "user" },
    { message: "some text form ai", role: "" },
  ]

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {/* {
            history?.map((message, i) => (
              <>
                <div
                  className={
                    message.role === "user" ? "message user" : "message"
                  }
                  key={i}
                >
                  {message.message}
                </div>

              </>
            ))} */}
            <NewPrompt />
        </div>
      </div>
    </div>)
}

export default ChatPage