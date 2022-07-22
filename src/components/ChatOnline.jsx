import axios from "axios";
import { useEffect, useState } from "react";
import chatCss from "./chatonline.module.css";

export default function ChatOnline({ currentId, setCurrentChat, user }) {
  const [friends, setFriends] = useState([]);
  const adminId = "62b1b35384c5c5bf0e6cd0fe";

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/api/users?userId=" + adminId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/api/conversation/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={chatCss.chatOnline}>
      {user.userType === "user" ? (
        <div
          className={chatCss.chatOnlineFriend}
          onClick={() => handleClick(friends)}
        >
          <div className={chatCss.chatOnlineImgContainer}>
            <img
              className={chatCss.chatOnlineImg}
              src={`${process.env.PUBLIC_URL}/lawyers/noavatar.png`}
              alt=""
            />
          </div>
          <span className={chatCss.chatOnlineName}>{friends?.name}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
