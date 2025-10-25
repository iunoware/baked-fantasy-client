import { X } from "lucide-react";
import { useEffect, useState } from "react";

function Modal() {
  const [close, setClose] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setShowPopup(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (close || !showPopup) return null;

  return (
    <>
      <div className={`${!close ? "block" : "hidden"}`}>
        <div
          className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4 transition-opacity ease-in-out opacity-100"
          role="dialog"
          // onClick={() => setClose(true)}
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="relative flex md:items-center pt-3 h-[60vh] md:pt-0 items-start justify-end pr-5 lg:w-[50vw] md:[90vw] bg-center bg-cover md:bg-[url('/images/popup.jpg')] bg-[url('/images/popup-mo.jpg')] rounded-2xl">
            <button
              type="button"
              className="rounded-full cursor-pointer absolute hover:rotate-90 transition-all ease-in  right-1 top-0 p-2 text-white/80 hover:text-white focus:outline-none"
              onClick={() => setClose(true)}
            >
              <X />
            </button>
            <div className="">
              <h1 className="mansalva-regular drop-shadow-5xl sm:px-0 px-5 w-full text-white md:text-6xl text-4xl text-center">
                15 Days <br /> Baking Course
              </h1>
              <p className="luckyGuy pt-5 px-4 w-full text-white font-bold text-lg text-center">
                Learn the basic <br /> and fundamental skills of baking!
              </p>
              <div className="w-full flex justify-center">
                <button className="w-30 p-2 mt-5 bg-sky-500 backdrop-blur-2xl hover:scale-108 transition-all ease-in text-white font-bold rounded-2xl">
                  Enroll now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
