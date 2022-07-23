import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import conversationCss from "./conversation.module.css";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const freindId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      const res = await axios.get("/api/users?userId=" + freindId);
      setUser(res.data);
    };
    getUser();
  }, [currentUser, conversation]);
  console.log(user);
  return (
    user && (
      <div className={conversationCss.conversation}>
        <img
          src={
            user.img_src
              ? `${process.env.PUBLIC_URL}/lawyers/${user.img_src}.jpg`
              : `${process.env.PUBLIC_URL}/lawyers/noavatar.png`
          }
          className={conversationCss.conversationImg}
        />
        <span className={conversationCss.conversationName}>{user.name}</span>
      </div>
    )
  );
}

export default Conversation;
