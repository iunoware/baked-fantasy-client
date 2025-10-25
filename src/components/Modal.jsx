import { X } from "lucide-react";

function Modal() {
  return (
    <>
      <div
        className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="relative flex items-center justify-center h-[60vh] w-[50vw] bg-center bg-cover bg-[url('/images/popup.jpg')] rounded-2xl">
          <button
            type="button"
            className="rounded-full absolute hover:rotate-90 transition-all ease-in  right-1 top-0 p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Close"
          >
            <X />
          </button>
          <div className="">
            <h1 className="mansalva-regular text-white text-6xl text-center">
              15 Days <br /> Baking Course
            </h1>
            <p className="luckyGuy pt-5 text-white font-bold text-lg text-center">
              Learn the basic <br /> and fundamental skills of baking!
            </p>
            <button className="">Enroll now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
