import React, { useEffect } from "react";
import Form from "./form";
export const Index = React.forwardRef((props, ref) => {
  useEffect(() => {
    console.log(ref.current.scene.scenes[0]);
  }, [ref]);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100svh",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {/* <Form /> */}
      {/* <Preloading /> */}
    </div>
  );
});

function Preloading() {
  const [preload, setPreload] = React.useState(true);
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
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <p>loading...</p>
      </div>
    </div>
  );
}

export default Index;
