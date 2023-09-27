import React, { useEffect } from "react";

function Submit({ submitTrigger, trackBtn }) {
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
        className: "submit",
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

        <div className="block" style={{ height: "4svh" }} />

        <h2
          style={{
            fontSize: "3svh",
          }}
        >
          SUBMITTED!
        </h2>

        <div className="block" style={{ height: "1svh" }} />

        <div
          className="submitTextContainer"
          style={{
            padding: "2vh 0",
          }}
        >
          <h4
            style={{
              textTransform: "uppercase",
              fontFamily: "Montblant",
              fontWeight: "100",
            }}
          >
            THANKS FOR PLAYING <br /> We invite you to discover the new <br />
            Montblanc Extreme 3.0 collection.{" "}
          </h4>

          <div className="block" style={{ height: "3svh" }} />

          <h4
            style={{
              fontFamily: "Montblant",
              fontWeight: "100",
            }}
          >
            To receive your gift*, screenshot this <br />
            page and show this to the friendly staff <br />
            at Montblanc’s boutiques.
          </h4>

          <div className="block" style={{ height: "3svh" }} />

          <h4>Pavilion Kuala Lumpur – Lot 3.40 & 3.41</h4>
          <h4>Suria KLCC – Lot 131-132A</h4>
          <h4>The Gardens Mall – Lot G-236</h4>
        </div>

        <div className="block" style={{ height: "1svh" }} />

        <p
          style={{
            fontSize: "1.4svh",
          }}
        >
          *Only 1 redemption per person. Complimentary gift is limited.
          <br />
          Montblanc reserves the right to change these terms and conditions{" "}
          <br />
          at any time without prior notice
        </p>

        <div className="block" style={{ height: "1svh" }} />

        <div
          style={{
            width: "fit-content",
            margin: "auto",
          }}
          onClick={() => {
            // refresh page
            trackBtn("playAgainBTN");
            window.location.reload();
          }}
        >
          <Button param="PLAY AGAIN" id={"playagain-2"} />
        </div>

        <div
          style={{
            width: "fit-content",
            margin: "auto",
          }}
          onClick={() => {
            // refresh page
            trackBtn("browseCollectionBTN");
            // to url https://www.montblanc.com/en-sg/discover/campaign/the-library-spirit
            window.open(
              "https://www.montblanc.com/en-sg/discover/campaign/the-library-spirit",
              "_blank"
            );
          }}
        >
          <Button param="BROWSE COLLECTION" id={"browsecollection"} />
        </div>

        <div className="block" style={{ height: "4svh" }} />
        <ShareExperance />

        <div className="block" style={{ height: "10svh" }} />
      </div>
    </div>
  );
}

function Button({ param = "SUBMIT", info, setInfo, id }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0",
      }}
    >
      <button
        id={id}
        style={{
          backgroundColor: "#6b9397",
          color: "#fff",
          border: "none",
          margin: "auto",
          padding: "0.8rem",
          width: "50vw",
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

export const ShareExperance = () => {
  return (
    <div>
      <p
        style={{
          color: "#6b9397",
          textAlign: "center",
        }}
      >
        SHARE THE EXPERIENCE
      </p>

      <div className="block" style={{ height: "1svh" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 auto",
          width: "30vw",
        }}
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: "Montblanc The Library Spirit Word Search",
              text: "Montblanc invites you to explore the power of libraries through the lens of literary destinations with a game of word search.",
              url: "https://my.thelibraryspirit.com",
            });
          }
        }}
      >
        <div
          className="imgContainer"
          style={{
            width: "8vw",
            maxWidth: "50px",
          }}
        >
          <img src="/2d/whatsapp.png" />
        </div>
        <div
          className="imgContainer"
          style={{
            width: "8vw",
            maxWidth: "50px",
          }}
        >
          <img src="/2d/facebook.png" />
        </div>
        <div
          className="imgContainer"
          style={{
            width: "8vw",
            maxWidth: "50px",
          }}
        >
          <img src="/2d/twitter.png" />
        </div>
      </div>
    </div>
  );
};
export default Submit;
