import messageCss from "./message.module.css";
import NavbarCustom from "../components/NavbarCustom";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

function Messenger() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversation/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post("/api/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <NavbarCustom />
      <div className={messageCss.messenger}>
        <div className={messageCss.chatMenu}>
          <div className={messageCss.chatMenuWrapper}>
            {conversations.length &&
              conversations.map((c) => (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
          </div>
        </div>
        <div className={messageCss.chatBox}>
          <div className={messageCss.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={messageCss.chatBoxTop}>
                  {messages &&
                    messages.map((m) => (
                      <div ref={scrollRef} key={m._id}>
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    ))}
                </div>
                <div className={messageCss.chatBoxBottom}>
                  <textarea
                    className={messageCss.chatMessageInput}
                    placeholder="Write Something"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                  ></textarea>
                  <button
                    className={messageCss.chatSubmitButton}
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className={messageCss.noConversationText}>
                Open a conversation to open a chat
              </span>
            )}
          </div>
        </div>
        <div className={messageCss.chatOnline}>
          <div className={messageCss.chatOnlineWrapper}></div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
