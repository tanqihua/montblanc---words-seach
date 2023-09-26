import React, { useEffect } from "react";
import { ShareExperance } from "./submit";
function Form({
  setFormTrigger,
  formTrigger,
  gameRef,
  setSubmitTrigger,
  trackBtn,
  submit,
}) {
  const [info, setInfo] = React.useState({
    gental: null,
    terms: null,
    "first name": null,
    "last name": null,
    dd: null,
    mm: null,
    yyyy: null,
    email: null,
    mobile: null,
    countryCode: "+65",
  });

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100vw",
        height: "100svh",

        zIndex: 100,
        opacity: formTrigger ? 1 : 0,
        transition: "opacity 1s ease-in-out",
        zIndex: formTrigger ? 100 : -1,
        padding: "0 2rem",
        overflow: "scroll",

        position: "absolute",
        top: 0,
        left: 0,

        pointerEvents: formTrigger ? "all" : "none",
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

        <div className="block" style={{ height: "2.5svh" }} />

        <h2>YOUR SCORE</h2>
        <h1>{gameRef.current?.scene?.scenes[1].point ?? 0}</h1>
        <p>
          Submit your score to redeem a complimentary <br />
          gift* at any Montblanc boutiques.
        </p>

        <div className="block" style={{ height: "2.5svh" }} />

        <p
          style={{
            fontSize: "1.7svh",
          }}
        >
          *T&C applies. Limited redemptions available.
        </p>

        <div className="block" style={{ height: "1.7svh" }} />

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SellecBTN param={"MR."} info={info} setInfo={setInfo} />
            <SellecBTN param={"MS."} info={info} setInfo={setInfo} />
            <SellecBTN param={"OTHER"} info={info} setInfo={setInfo} />
          </div>

          <div className="block" style={{ height: "1.7svh" }} />

          <Input placeholder="First Name" info={info} setInfo={setInfo} />
          <Input placeholder="Last Name" info={info} setInfo={setInfo} />

          <div
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "space-between",
            }}
          >
            <Input
              placeholder="DD"
              info={info}
              setInfo={setInfo}
              size="25%"
              type={"number"}
              maxLength={2}
            />
            <Input
              placeholder="MM"
              info={info}
              setInfo={setInfo}
              size="25%"
              type={"number"}
              maxLength={2}
            />
            <Input
              placeholder="YYYY"
              info={info}
              setInfo={setInfo}
              size="35%"
              type={"number"}
              maxLength={4}
            />
          </div>
          <Input placeholder="Email" info={info} setInfo={setInfo} />

          <div
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "space-between",
            }}
          >
            <select
              name="+65"
              style={{
                width: "22.5%",
                textAlign: "center",
                color: "black",
                border: "none",
                borderRadius: "0",
                backgroundColor: "hsl(0deg 0% 85.1%)",
                margin: "0.5rem 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onChange={(e) => {
                setInfo({
                  ...info,
                  countryCode: e.target.value,
                });
              }}
            >
              <option value="+65" selected>
                +65
              </option>
              <option value="+60">+60</option>
            </select>

            <Input
              placeholder="Mobile"
              info={info}
              setInfo={setInfo}
              type={"number"}
              size="75%"
            />
          </div>
        </section>

        <div className="block" style={{ height: "3svh" }} />

        <Terms setInfo={setInfo} info={info} />

        <div
          style={{
            width: "fit-content",
            margin: "auto",
          }}
        >
          <Button
            param="SUBMIT"
            id="submit"
            setInfo={setInfo}
            info={info}
            onClick={() => {
              if (setInfo) {
                setInfo({
                  ...info,
                  submit: true,
                });

                let acc = 0;
                Object.keys(info).forEach((key) => {
                  if (info[key] === null) {
                    acc++;
                    console.log(key);
                  }
                });

                if (acc === 0) {
                  let _info = info;
                  _info.playHistory =
                    gameRef.current?.scene?.scenes[1].getPlayHistory();
                  _info.score = gameRef.current?.scene?.scenes[1].point ?? 0;
                  trackBtn("submit");
                  submit(_info);
                  setSubmitTrigger(true);
                  setFormTrigger(false);
                } else {
                  alert("Please fill in all the fields.");
                }
              }
            }}
          />
        </div>
        <div />
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
          <Button
            param="PLAY AGAIN"
            id={"playagain"}
            onClick={() => {
              trackBtn("PlayAgain-formpage");
              // refresh page
              window.location.reload();
            }}
          />
        </div>
      </div>

      <ShareExperance />

      <div className="block" style={{ height: "10svh" }} />
    </div>
  );
}
// border: info.submit && info.terms ? "red 1px solid" : "none",

function Terms({ info = null, setInfo }) {
  return (
    <section
      style={{
        display: "flex",
      }}
      className="terms"
      onClick={() => {
        setInfo({
          ...info,
          terms: !info.terms,
        });
      }}
    >
      <div>
        <button
          id="terms"
          style={{
            width: "0.7rem",
            height: "0.7rem",
            backgroundColor: "#c8c8c8",
            borderRadius: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "0.5rem",
            border: "none",
          }}
        >
          <div
            style={{
              width: "0.4rem",
              height: "0.4rem",
              backgroundColor: !info?.terms ? "#fff" : "#000",
              borderRadius: 0,
              border: "none",
            }}
          />
        </button>
      </div>

      <div>
        <p
          style={{
            fontFamily: "Montblant",
          }}
        >
          By submitting this form, you agree that Montblanc may contact you
          using one of the communication channels you have provided to send you
          information about Montblanc's products and services, promotions and
          other activities that may be of interest to you.
        </p>
        <p
          style={{
            fontFamily: "Montblant",
          }}
        >
          For further details on how we manage your data, please see our
          <span style={{ textDecoration: "underline" }}> Privacy Policy</span>.
        </p>
      </div>
    </section>
  );
}

function Input({
  info = null,
  setInfo,
  placeholder = "First Name",
  size = "90%",
  type = "text",
  name = "num",
  maxLength = 4,
}) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={(e) => {
        if (type === "number" && e.target.value.length > maxLength) {
          e.target.value = e.target.value.slice(0, maxLength);
        }
        setInfo({
          ...info,
          [placeholder.toLowerCase()]: e.target.value,
        });
      }}
      style={{
        textAlign: "center",
        color: "black",
        border: "none",
        backgroundColor: "hsl(0deg 0% 85.1%)",
        width: size,
        padding: "0.7rem",
        margin: "0.5rem 0",
        borderRadius: "0",
      }}
    />
  );
}

function SellecBTN({ param = "MR.", info = null, setInfo }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        margin: "0 0.7rem",
      }}
      onClick={() => {
        setInfo({
          ...info,
          gental: param,
        });
      }}
    >
      <button
        style={{
          width: "0.8rem",
          height: "0.8rem",
          borderRadius: "50%",
          marginRight: "0.25rem",
          backgroundColor: info.gental === param ? "#afadad" : "transparent",
          border: ".1rem solid #afadad",
        }}
      />
      <h4
        style={{
          fontSize: "2.3svh",
        }}
      >
        {param}
      </h4>
    </div>
  );
}

function Button({ param = "SUBMIT", info, setInfo, onClick, id }) {
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
        id={id}
        onClick={() => {
          onClick();
        }}
      >
        {param}
      </button>
    </div>
  );
}

export default Form;
