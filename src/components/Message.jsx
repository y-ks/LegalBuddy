import messageCss from "./message.module.css";
import { format } from "timeago.js";

function Message({ message, own, user }) {
  return (
    <div
      className={
        own ? `${messageCss.message} ${messageCss.own}` : messageCss.message
      }
    >
      <div className={messageCss.messageTop}>
        <img
          src={
            own
              ? user.img_src
                ? `${process.env.PUBLIC_URL}/lawyers/${user?.img_src}.jpg`
                : `${process.env.PUBLIC_URL}/lawyers/noavatar.png`
              : `${process.env.PUBLIC_URL}/lawyers/noavatar.png`
          }
          className={messageCss.messageImg}
        />
        <p className={messageCss.messageText}>{message.text}</p>
      </div>
      <div className={messageCss.messageBottom}>
        {format(message.createdAt)}
      </div>
    </div>
  );
}

export default Message;
