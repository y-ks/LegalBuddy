import messageCss from "./message.module.css";
import NavbarCustom from "../components/NavbarCustom";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Messenger() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [conversations, setConversations] = useState([]);

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
  return (
    <>
      <NavbarCustom />
      <div className={messageCss.messenger}>
        <div className={messageCss.chatMenu}>
          <div className={messageCss.chatMenuWrapper}>
            {conversations.length &&
              conversations.map((c) => (
                <Conversation conversation={c} currentUser={user} key={c._id} />
              ))}
          </div>
        </div>
        <div className={messageCss.chatBox}>
          <div className={messageCss.chatBoxWrapper}>
            <div className={messageCss.chatBoxTop}>
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className={messageCss.chatBoxBottom}>
              <textarea
                className={messageCss.chatMessageInput}
                placeholder="Write Something"
              ></textarea>
              <button className={messageCss.chatSubmitButton}>Send</button>
            </div>
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
