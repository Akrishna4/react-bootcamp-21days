import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [likeCount, setLikeCount] = useState(50);
  const [dislikeCount, setDislikeCount] = useState(25);
  const [activeBtn, setActiveBtn] = useState("none");
  const [animation, setAnimation] = useState(null);

  const handleReactionClick = (reaction) => {
    // Prevent rapid clicking
    if (animation) return;

    // Like logic
    if (reaction === "like") {
      if (activeBtn === "none") {
        setLikeCount(likeCount + 1);
        setActiveBtn("like");
        triggerAnimation("like");
      } else if (activeBtn === "like") {
        setLikeCount(likeCount - 1);
        setActiveBtn("none");
      } else if (activeBtn === "dislike") {
        setLikeCount(likeCount + 1);
        setDislikeCount(dislikeCount - 1);
        setActiveBtn("like");
        triggerAnimation("like");
      }
    }
    // Dislike logic
    else if (reaction === "dislike") {
      if (activeBtn === "none") {
        setDislikeCount(dislikeCount + 1);
        setActiveBtn("dislike");
        triggerAnimation("dislike");
      } else if (activeBtn === "dislike") {
        setDislikeCount(dislikeCount - 1);
        setActiveBtn("none");
      } else if (activeBtn === "like") {
        setDislikeCount(dislikeCount + 1);
        setLikeCount(likeCount - 1);
        setActiveBtn("dislike");
        triggerAnimation("dislike");
      }
    }
  };

  const triggerAnimation = (type) => {
    setAnimation(type);
    setTimeout(() => setAnimation(null), 500);
  };

  return (
    <div className="container">
      <div className="btn-container">
        <button
          className={`btn ${activeBtn === "like" ? "like-active" : ""} ${
            animation === "like" ? "pulse" : ""
          }`}
          onClick={() => handleReactionClick("like")}
          aria-label="Like"
        >
          <span className="material-icons">thumb_up</span>
          <span className="count">{likeCount}</span>
        </button>

        <div className="divider"></div>

        <button
          className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""} ${
            animation === "dislike" ? "pulse" : ""
          }`}
          onClick={() => handleReactionClick("dislike")}
          aria-label="Dislike"
        >
          <span className="material-icons">thumb_down</span>
          <span className="count">{dislikeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default App;
