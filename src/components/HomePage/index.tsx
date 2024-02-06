import { ChangeEvent, useState } from "react";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import HomePageImg from "../../assets/Images/homepage.png";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const [emptyError, setEmptyError] = useState<boolean>(false);

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setEmptyError(false);

    if (value.length >= 2) {
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setEmptyError(true);
      return;
    }
    if (!err && name.trim()) {
      setEmptyError(false);
      localStorage.setItem("username", name.trim());
      navigate("/wordgame");
    }
  };
  return (
    <div className="home">
      <h2 style={{ color: "#FF004D", margin: 0 }}>Welcome to Type Race game</h2>
      <h3> This Game is Here to , Improve your Typing Speed & Accuracy</h3>
      <div className="home-con">
        <div className="image-container">
          <img src={HomePageImg} alt="home-page-image" />
        </div>
        <div className="user-form">
          <form>
            <div className="inputs-labels">
              <label>
                <b id="user-name"> Enter your Playername: </b>
              </label>
              <input
                type="text"
                onChange={handleChangeUserName}
                placeholder="Enter Player Name "
              />
              {err && (
                <span id="er">username must have some more characters</span>
              )}

              {emptyError && <span id="er">username is required!</span>}
            </div>
            <button id="btn" type="button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
