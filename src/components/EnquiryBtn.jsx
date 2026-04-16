import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

function EnquiryBtn() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="tel:+916379240125"
        className={` ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-4 pointer-events-none"} fixed bottom-6 right-4 z-50 gap-3 flex items-center justify-center w-fit px-4 h-12 rounded-full new-primary-bg text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200`}
        aria-label="Call us"
      >
        Enquiry <Phone className="size-5" />
      </a>

      {/* <div className="fixed bottom-38 md:top-[30%] right-2 md:-right-55 z-50 md:rotate-270 scale-90 md:scale-100">
        <a
          className="group relative inline-flex items-center overflow-hidden rounded-full new-primary-bg px-6 py-2.5 md:px-8 md:py-3 text-white shadow-xl"
          href="tel:+916379240125"
          target="_blank"
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <Phone className="size-4 md:size-5" />
          </span>

          <span className="text-[10px] md:text-sm text-white font-bold transition-all group-hover:ms-4 uppercase tracking-widest">
            ENQUIRY
          </span>
        </a>
      </div> */}
    </>
  );
}
export default EnquiryBtn;
