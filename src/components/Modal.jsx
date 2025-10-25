import { X } from "lucide-react";
// this si for the modal
// and this is also
function Modal() {
  return (
    <>
      <div
        className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        {/* <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <h2
              id="modalTitle"
              className="text-xl font-bold text-gray-900 sm:text-2xl"
            >
              Modal Title
            </h2>

            <button
              type="button"
              className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <p className="text-pretty text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque euismod, nisi eu consectetur. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div> */}
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
          </div>
          {/* <img
            src="/images/popup.jpg"
            alt="Banner"
            className="rounded-2xl flex"
          /> */}
        </div>
      </div>
    </>
  );
}

export default Modal;
