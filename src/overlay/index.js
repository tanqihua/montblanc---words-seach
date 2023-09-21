import React, { useEffect } from "react";
import Form from "./form";
export const Index = React.forwardRef((props, ref) => {
  const [formTrigger, setFormTrigger] = React.useState(false);

  useEffect(() => {
    console.log(ref.current.scene.scenes[0]);
  }, [ref]);

  useEffect(() => {
    window.setFormTrigger = () => {
      setFormTrigger(true);
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
        pointerEvents: formTrigger ? "all" : "none",
      }}
    >
      <Form setFormTrigger={setFormTrigger} formTrigger={formTrigger} />
      <Preloading />
    </div>
  );
});

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
          <img src="/2d/icon.png" />
        </div>

        <h5
          style={{
            fontWeight: "400",
            textTransform: "uppercase",
            marginTop: "0.5rem",
          }}
        >
          Load{displayText}
        </h5>
      </div>
    </div>
  );
}

export default Index;
