import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = () => {
  const [sharedPhotos, setSharedPhotos] = useState([]);
  const [showPhotos, setShowPhotos] = useState(true);
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
  } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    const fetchSharedPhotos = async () => {
      if (!chatId) return;

      const chatDocRef = doc(db, "chats", chatId);

      try {
        const chatDoc = await getDoc(chatDocRef);
        if (chatDoc.exists()) {
          const messages = chatDoc.data().messages || [];
          const photos = messages
            .filter((msg) => msg.img)
            .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
            .map((msg) => msg.img);
          setSharedPhotos(photos);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSharedPhotos();
  }, [chatId]);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title" onClick={() => setShowPhotos((prev) => !prev)}>
            <span>Shared photos</span>
            {showPhotos ? (
              <img src="./arrowDown.png" alt="" />
            ) : (
              <img src="./arrowUp.png" alt="" />
            )}
          </div>
          {showPhotos && (
            <div className="photos">
              {sharedPhotos.map((photo, index) => (
                <div className="photoItem" key={index}>
                  <div className="photoDetail">
                    <img src={photo} alt={`Shared photo ${index}`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
