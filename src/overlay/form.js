import React, { useEffect } from "react";

function Form({ setFormTrigger, formTrigger }) {
  const [info, setInfo] = React.useState({
    gental: null,
    terms: false,
    "first name": null,
    "last name": null,
    dd: null,
    "d.o.b": null,
    yyyy: null,
    email: null,
    mobile: null,
    submit: false,
  });

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100vw",
        height: "100svh",

        zIndex: 100,
        backgroundImage: "url(/2d/BG.jpg)",
        opacity: formTrigger ? 1 : 0,
        transition: "opacity 1s ease-in-out",
        zIndex: formTrigger ? 100 : -1,
      }}
    >
      <div
        style={{
          width: "80%",
          margin: "auto",
          height: "200vh",
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

        <h2>YOUR SCORE</h2>
        <h1>1500</h1>
        <p>
          Submit your score to be in the running to win a <br />
          Montblanc xxx.
        </p>

        <div className="block" style={{ height: "1svh" }} />

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
            />
            <Input
              placeholder="D.O.B"
              info={info}
              setInfo={setInfo}
              size="35%"
              type={"number"}
            />
            <Input
              placeholder="YYYY"
              info={info}
              setInfo={setInfo}
              size="25%"
              type={"number"}
            />
          </div>
          <Input placeholder="Email" info={info} setInfo={setInfo} />
          <Input
            placeholder="Mobile"
            info={info}
            setInfo={setInfo}
            type={"number"}
          />
        </section>

        <div className="block" style={{ height: "3svh" }} />

        <Terms setInfo={setInfo} info={info} />

        <Button param="SUBMIT" setInfo={setInfo} info={info} />
        <div />
        <Button param="PLAY AGAIN" />
      </div>

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
        <p>
          By submitting this form, you agree that Montblanc may contact you
          using one of the communication channels you have provided to send you
          information about Montblanc's products and services, promotions and
          other activities that may be of interest to you.
        </p>
        <p>
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
}) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      onChange={(e) => {
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

export default Form;
