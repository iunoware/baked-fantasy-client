import { Phone } from "lucide-react";

function EnquiryBtn() {
  return (
    <>
      <div className=" fixed top-[50%] -right-9 rounded-lg !shadow-sm rotate-270">
        <a
          className="group relative inline-flex items-center overflow-hidden rounded-full new-primary-bg px-8 py-3 text-white"
          href="tel:+916379240125"
          target="_blank"
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <Phone className="size-5" />
          </span>

          <span className="text-sm text-white font-bold transition-all group-hover:ms-4">
            ENQUIRY
          </span>
        </a>
      </div>
    </>
  );
}
export default EnquiryBtn;
