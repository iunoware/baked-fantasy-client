import { PhoneOutgoing } from "lucide-react";

function EnquiryBtn() {
  return (
    <>
      <div class="new-primary-light-bg fixed top-[50%] -right-9 rounded-lg !shadow-sm rotate-270">
        <a
          class="group relative inline-flex items-center overflow-hidden rounded-full new-primary-light-bg px-8 py-3 text-white"
          href="tel:+916379240125"
          target="_blank"
        >
          <span class="absolute -start-full transition-all group-hover:start-4">
            <PhoneOutgoing className="size-5" />
          </span>

          <span class="text-sm text-white font-bold transition-all group-hover:ms-4">
            ENQUIRY
          </span>
        </a>
      </div>
    </>
  );
}
export default EnquiryBtn;
