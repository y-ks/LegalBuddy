import messageCss from "./message.module.css";

function Message({ own }) {
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
        <p className={messageCss.messageText}>HEllo</p>
      </div>
      <div className={messageCss.messageBottom}>1 housr ago</div>
    </div>
  );
}

export default Message;
