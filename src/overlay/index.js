import React, { useEffect } from "react";
import Form from "./form";
import Submit from "./submit";

import useFirebase from "../store/firebase";

export const Index = React.forwardRef((props, ref) => {
  const { gameRef } = props;
  const [startGame, setStartGame] = React.useState(false);
  const [formTrigger, setFormTrigger] = React.useState(false);
  const [submitTrigger, setSubmitTrigger] = React.useState(false);

  const firebase = useFirebase((state) => state.firebase);
  useEffect(() => {
    window.setFormTrigger = () => {
      setFormTrigger(true);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        pointerEvents: formTrigger ? "all" : "none",
        height: "100svh",
      }}
    >
      <Button
        param={"START"}
        startGame={startGame}
        setStartGame={setStartGame}
        gameRef={gameRef}
        trackBtn={firebase.trackBtn}
      />
      <Submit
        setSubmitTrigger={setSubmitTrigger}
        submitTrigger={submitTrigger}
        trackBtn={firebase.trackBtn}
      />
      <Form
        setFormTrigger={setFormTrigger}
        formTrigger={formTrigger}
        gameRef={gameRef}
        setSubmitTrigger={setSubmitTrigger}
        trackBtn={firebase.trackBtn}
        submit={firebase.submit}
      />
      <Preloading />

      <LegerLine />
    </div>
  );
});

function Button({
  param = "SUBMIT",
  startGame,
  setStartGame,
  gameRef,
  trackBtn,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1.5rem 0",
        position: "absolute",
        bottom: "7.5%",
        left: "50%",
        transform: "translate(-50%,0)",
        opacity: startGame ? 0 : 1,
        transition: "opacity 1s ease-in-out",
        pointerEvents: startGame ? "none" : "all",
      }}
    >
      <button
        style={{
          backgroundColor: "#6b9397",
          color: "#fff",
          border: "none",
          margin: "auto",
          padding: "0.8rem",
          width: "35vw",
        }}
        onClick={() => {
          setStartGame(true);
          gameRef.current?.scene?.scenes[1].startMainGame();
          trackBtn("startBTN");
        }}
      >
        {param}
      </button>
    </div>
  );
}

const LegerLine = () => {
  return (
    <div
      className="footer"
      style={{
        position: "absolute",
        bottom: "1.5%",
        left: "50%",
        zIndex: 10000000000000,
        transform: "translate(-50%,0)",
        width: "100vw",
        textAlign: "center",
      }}
    >
      <span
        className="mt-auto"
        style={{
          fontSize: "1.8vw",
          color: "black",
        }}
      >
        <span
          style={{
            fontSize: "2.5vw",
            position: "relative",
            top: "0.25vw",
            marginRight: "0.8vw",
          }}
        >
          ©
        </span>
        {"  "} ALL RIGHTS RESERVED BY MONTBLANC. POWERED BY{" "}
        <a
          style={{
            color: "black",
          }}
          href="https://www.instagram.com/conten.tech/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          CONTEN.T
        </a>
      </span>
    </div>
  );
};

function Preloading({ text = "ing..." }) {
  const [preload, setPreload] = React.useState(true);

  const [displayText, setDisplayText] = React.useState("ing...");
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        setIndex(index + 1);
      } else if (!preload) {
        clearInterval(typingInterval);
      } else {
        setDisplayText(text.slice(0, 3));
        setIndex(4);
      }
    }, 100); // Adjust typing speed by changing the interval (in milliseconds)

    return () => clearInterval(typingInterval);
  }, [text, index]);

  useEffect(() => {
    window.setPreload = () => {
      setPreload(false);
    };
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100svh",
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,1)",
        opacity: preload ? 1 : 0,
        transition: "opacity 1s ease-in-out",
        pointerEvents: preload ? "all" : "none",
        backgroundColor: "#e2e2e2",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="imgContainer spin"
          style={{
            width: "20vw",
            height: "20vw",
            maxHeight: "200px",
            maxWidth: "200px",
          }}
        >
          <img src="/2d/icon2.png" />
        </div>

        {/* <h5
          style={{
            fontWeight: "400",
            textTransform: "uppercase",
            marginTop: "0.5rem",
          }}
        >
          Load{displayText}
        </h5> */}
      </div>
    </div>
  );
}

export default Index;
