import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading(props) {
  return (
    <DotLottieReact
      style={{
        width: props.width ? props.width : "200px",
        height: props.height ? props.height : "200px",
      }}
      src="https://lottie.host/a09916fc-5ef3-405b-a7db-2936a5071835/G2IFDxTp13.lottie"
      loop
      autoplay
    />
  );
}

export default Loading;
