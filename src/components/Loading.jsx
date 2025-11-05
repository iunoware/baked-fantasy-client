import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading() {
  return (
    <div>
      {/* // <DotLottieReact
    //   style={{
    //     width: props.width ? props.width : "200px",
    //     height: props.height ? props.height : "200px",
    //   }}
    //   src="https://lottie.host/a09916fc-5ef3-405b-a7db-2936a5071835/G2IFDxTp13.lottie"
    //   loop
    //   autoplay
    // /> */}
      <DotLottieReact
        src="https://lottie.host/4bfe01ad-0034-45ec-a8ad-5e40cb714e89/bL24PzwADu.lottie"
        loop
        autoplay
        className="flex justify-center items-center p-0 m-0 w-80 h-80"
        // style={{
        //   width: "200px",
        //   height: "200px",
        // }}
      />
      <h2 className="text-center">Small props text</h2>
    </div>
  );
}

export default Loading;
