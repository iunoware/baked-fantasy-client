import { Phone } from "lucide-react";

function EnquiryBtn() {
  return (
    <>
      <div className="fixed bottom-24 md:top-[30%] right-2 md:-right-55 z-50 md:rotate-270 scale-90 md:scale-100">
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
      </div>
    </>
  );
}
export default EnquiryBtn;
