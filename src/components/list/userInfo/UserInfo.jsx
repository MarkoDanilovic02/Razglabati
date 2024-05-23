import "./userInfo.css";
import { useUserStore } from "../../../lib/userStore";
import { useState } from "react";
import { auth } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const UserInfo = () => {
  const { currentUser } = useUserStore();
  const [showMore, setShowMore] = useState(false);

  const { resetChat } = useChatStore();

  const handleMore = () => {
    setShowMore((prevState) => !prevState);
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" onClick={handleMore} />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
      {showMore && (
        <div className="logoutBtn">
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
