import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading(props) {
  return (
    <div className="flex w-full justify-center items-center flex-col mb-15 rounded-2xl">
      {/* <DotLottieReact
        src="https://lottie.host/4bfe01ad-0034-45ec-a8ad-5e40cb714e89/bL24PzwADu.lottie"
        loop
        autoplay
        className="flex justify-center items-center p-0 m-0 w-80 h-80 rounded-2xl"
      /> */}
      <DotLottieReact
        src="https://lottie.host/d04b0aee-856c-4e0e-8b65-317529d3af7e/cQsMS5sDkO.lottie"
        loop
        autoplay
        className="flex justify-center items-center p-0 m-0 w-200 rounded-2xl"
      />
      <h2 className="text-center lora font-semibold text-3xl px-3 -translate-y-20">{props.text}</h2>
    </div>
  );
}

export default Loading;
