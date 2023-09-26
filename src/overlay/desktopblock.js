export const DesktopBlock = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100svh",
        backgroundImage: "url(/2d/BG.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="block"
        style={{
          height: "6svh",
        }}
      />
      <div
        className="imgContainerHeight"
        style={{
          height: "12svh",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <img src="/2d/MB_logo.png" />
      </div>

      <div
        className="block"
        style={{
          height: "3svh",
        }}
      />

      <h2
        style={{
          lineHeight: "1.5",
        }}
      >
        THIS EXPERIENCE IS ONLY AVAILABLE ON MOBILE <br />
        PLEASE SCAN THE QR CODE BELOW TO ACCESS
      </h2>

      <div
        className="block"
        style={{
          height: "4svh",
        }}
      />

      <div
        className="imgContainerHeight"
        style={{
          height: "40svh",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <img src="/2d/Montblanc_SG.png" />
      </div>
      <div
        className="block"
        style={{
          height: "3svh",
        }}
      />
      <Button param={"BROWSE COLLECTION"} id="learnmore" />
      <LegerLine />
    </div>
  );
};

function Button({ param = "SUBMIT", info, setInfo }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem auto",
        width: "fit-content",
      }}
      onClick={() => {
        window.open(
          "https://www.montblanc.com/en-sg/discover/campaign/the-library-spirit",
          "_blank"
        );
      }}
    >
      <button
        style={{
          backgroundColor: "#6b9397",
          color: "#fff",
          border: "none",
          margin: "auto",
          padding: "1rem",
          width: "25svh",
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
          fontSize: "1.8svh",
          color: "black",
        }}
      >
        <span
          style={{
            fontSize: "3svh",
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
