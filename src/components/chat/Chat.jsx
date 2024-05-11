import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";

const Chat = () => {
  const [open, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();

  function handleEmoji(e) {
    setText((prev) => prev + e.emoji);
    setIsOpen(false);
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", ""), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Miloske</span>
            <p>Hello guys my name is Luka!</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="media" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio nam quas
            </p>
            <span>5 minutes ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio nam quas
            </p>
            <span>5 minutes ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio nam quas
            </p>
            <span>5 minutes ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio nam quas
            </p>
            <span>5 minutes ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio nam quas
            </p>
            <span>5 minutes ago</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
