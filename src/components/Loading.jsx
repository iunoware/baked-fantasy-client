import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading(props) {
  return (
    <div className="flex justify-center items-center flex-col mb-15 rounded-2xl">
      <DotLottieReact
        src="https://lottie.host/4bfe01ad-0034-45ec-a8ad-5e40cb714e89/bL24PzwADu.lottie"
        loop
        autoplay
        className="flex justify-center items-center p-0 m-0 w-80 h-80 rounded-2xl"
      />
      <h2 className="text-center font-semibold text-3xl px-3">{props.text}</h2>
    </div>
  );
}

export default Loading;
