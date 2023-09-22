import React, { useEffect } from "react";

function Submit({ submitTrigger }) {
  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100vw",
        height: "100svh",
        zIndex: submitTrigger ? 100 : -1,
        opacity: submitTrigger ? 1 : 0,
        pointerEvents: submitTrigger ? "all" : "none",
        transition: "opacity 1s ease-in-out",
        padding: "0 2rem",
        overflow: "scroll",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          margin: "auto",
        }}
      >
        <div className="block" style={{ height: "5svh" }} />
        <div
          className="imgContainerHeight"
          style={{
            height: "10svh",
            width: "fit-content",
            margin: "auto",
          }}
        >
          <img src="/2d/MB_logo.png" />
        </div>

        <div className="block" style={{ height: "3svh" }} />

        <h2
          style={{
            fontSize: "3svh",
          }}
        >
          SUBMITTED!
        </h2>

        <div className="block" style={{ height: "3svh" }} />

        <p>THANKS FOR PLAYING</p>

        <div className="block" style={{ height: "35svh" }} />

        <p>
          To receive your gift*, screenshot this page and <br /> show this to
          the friendly staff at Montblanc’s <br />
          pop up at Vivo City from 27th Sept – 9 Oct, or <br />
          visit any Montblanc boutique at:
        </p>

        <div className="block" style={{ height: "1svh" }} />

        <div
          style={{
            width: "fit-content",
            margin: "auto",
          }}
          onClick={() => {
            // refresh page
            window.location.reload();
          }}
        >
          <Button param="PLAY AGAIN" />
        </div>
      </div>
    </div>
  );
}

function Button({ param = "SUBMIT", info, setInfo }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1.5rem 0",
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
          if (setInfo) {
            setInfo({
              ...info,
              submit: true,
            });
          }
        }}
      >
        {param}
      </button>
    </div>
  );
}

export default Submit;
