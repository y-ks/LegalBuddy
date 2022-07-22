import messageCss from "./message.module.css";
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <div
      className={
        own ? `${messageCss.message} ${messageCss.own}` : messageCss.message
      }
    >
      <div className={messageCss.messageTop}>
        <img
          src={`${process.env.PUBLIC_URL}/lawyers/smile.jpg`}
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
