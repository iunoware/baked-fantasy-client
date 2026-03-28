// import { Link } from "react-router-dom";
// import { MapPin } from "lucide-react";
// import { Phone } from "lucide-react";
// import { Mail } from "lucide-react";

// // footer bg color (light): #FF6F89
// // footer bg color2 (dark): #9A1436

// function Footer() {
//   return (
//     <div className=" p-6">
//       <footer className="new-primary-bg block rounded-4xl">
//         <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8 grid gird-cols-3">
//           <div className="grid grid-cols-1 h-full sm:h-full md:h-full lg:h-40 lg:grid-cols-3 ">
//             <div className="">
//               <div className="text-white font-bold text-2xl ">
//                 <h3 className="brand-name">The Baked Fantasy</h3>
//               </div>
//               <p className="mt-4 max-w-xs text-white">
//                 Your premier destination for professional baking education and
//                 artisanal bakery products. Learn from experts and savor the
//                 finest baked goods.
//               </p>

//               {/* social links */}
//               <ul className="mt-8 flex gap-6">
//                 <li>
//                   <a
//                     href="https://www.facebook.com/profile.php?id=100079658200291"
//                     rel="noreferrer"
//                     target="_blank"
//                     className="text-white flex transition-all duration-300 hover:-translate-y-1"
//                   >
//                     <span className="sr-only">Facebook</span>

//                     <svg
//                       className="size-8"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       aria-hidden="true"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </li>

//                 <li>
//                   <a
//                     href="https://www.instagram.com/thebakedfantasy/?fbclid=IwY2xjawN5VPhleHRuA2FlbQIxMABicmlkETFvaFBqOEtQejhUNDhUWG9nc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHldG2usqEap9WHWd_T0R5YtwNBizZoBFnaUypwedcK1zm1ev2SNznJliGd0f_aem_Pum16EwbhhjCbG_I_O0YZQ"
//                     rel="noreferrer"
//                     target="_blank"
//                     className="text-white flex transition-all duration-300 hover:-translate-y-1"
//                   >
//                     <span className="sr-only">Instagram</span>

//                     <svg
//                       className="size-8"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       aria-hidden="true"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </li>

//                 {/* <li>
//                   <a
//                     href="#"
//                     rel="noreferrer"
//                     target="_blank"
//                     className="text-cyan-500 transition hover:opacity-75"
//                   >
//                     <span className="sr-only">Twitter</span>

//                     <svg
//                       className="size-6"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       aria-hidden="true"
//                     >
//                       <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                     </svg>
//                   </a>
//                 </li> */}

//                 {/* <li>
//                   <a
//                     href="#"
//                     rel="noreferrer"
//                     target="_blank"
//                     className="text-pink-500 transition hover:opacity-75"
//                   >
//                     <span className="sr-only">GitHub</span>

//                     <svg
//                       className="size-6"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       aria-hidden="true"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </li> */}
//               </ul>
//             </div>

//             <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2">
//               {/* quick links */}
//               <div className="hidden md:block">
//                 <p className="font-semibold text-xl pt-10 lg:pt-0 text-white">
//                   Quick Links
//                 </p>

//                 <ul className="mt-6 space-y-4 text-lg">
//                   <li>
//                     <Link
//                       to="/"
//                       className="text-white transition-all duration-200 hover:font-bold"
//                     >
//                       Home
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       to="/about"
//                       className="text-white transition-all duration-200 hover:font-bold"
//                     >
//                       About Us
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       to="/products"
//                       className="text-white transition-all duration-200 hover:font-bold"
//                     >
//                       Products
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       to="/courses"
//                       className="text-white transition-all duration-200 hover:font-bold"
//                     >
//                       Courses
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       to="/contact"
//                       className="text-white transition-all duration-200 hover:font-bold"
//                     >
//                       Contact us
//                     </Link>
//                   </li>
//                 </ul>
//               </div>

//               {/* contact info */}
//               <div>
//                 <p className="font-semibold text-xl pt-10 lg:pt-0 text-white">
//                   Contact Info
//                 </p>

//                 <ul className="mt-6 space-y-4 text-lg">
//                   <li>
//                     <a
//                       href="https://maps.app.goo.gl/LTWYRQ9R5etirRqYA"
//                       target="_blank"
//                       className="text-white flex justify-center items-start gap-2 transition-all duration-200 hover:font-semibold"
//                     >
//                       <div>
//                         <MapPin size={24} />
//                       </div>
//                       <div>
//                         Jeevana school road, Jai nagar 2nd street, Ponmeni,
//                         Bypass Road, Madurai - 625016
//                       </div>
//                     </a>
//                   </li>

//                   <li>
//                     <a
//                       href="tel:+916379240125"
//                       target="_blank"
//                       className="text-white flex gap-2 transition-all duration-200 hover:font-bold"
//                     >
//                       <div>
//                         <Phone size={20} />
//                       </div>
//                       <div>+91 6379240125</div>
//                     </a>
//                   </li>

//                   <li>
//                     <a
//                       // href="https://mailto:thebakedfantasy.6@gmail.com"
//                       href="https://mail.google.com/mail/?view=cm&fs=1&to=thebakedfantasy.6@gmail.com"
//                       target="_blank"
//                       className="text-white flex gap-2 transition-all duration-200 hover:font-bold"
//                     >
//                       <div>
//                         <Mail size={20} />
//                       </div>
//                       <div>thebakedfantasy.6@gmail.com</div>
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <p className="text-md inline-block w-fit pt-10 sm:pt-10 md:pt-10 lg:pt-2 text-white">
//             &copy; 2025. Iunoware pvt ltd. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Footer;

// import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { Ban, Pipette, FlaskConical, TestTube } from "lucide-react";
import { Link } from "react-router-dom";

function ColorPicker() {
  return (
    <div className="relative inline-flex justify-center items-center">
      <Ban className="absolute h-8" strokeWidth={1.25} size={100} />
      <Pipette className="absolute opacity-80" size={16} />
    </div>
  );
}

function Chemical() {
  return (
    <div className="relative inline-flex justify-center items-center">
      <Ban className="absolute h-8" strokeWidth={1.25} size={100} />
      <FlaskConical className="absolute opacity-80" size={18} />
    </div>
  );
}

function Flavour() {
  return (
    <div className="relative inline-flex justify-center items-center">
      <Ban className="absolute h-8" strokeWidth={1.25} size={100} />
      <TestTube className="absolute opacity-80" size={20} />
    </div>
  );
}

// const quickLinks = [
//   { title: "Homepage", link: "/" },
//   { title: "About Us", link: "/about" },
//   { title: "Bakery", link: "/categories" },
//   { title: "Home page", link: "/" },
//   { title: "Home page", link: "/" },
// ];

export default function Footer() {
  return (
    <footer className="bg-[#7a0c1c] text-white px-6 md:px-16 py-12">
      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-10 pb-5">
        {/* LEFT - BRAND + NEWSLETTER */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row justify-start md:items-center items-start gap-7">
            <img
              src="/images/footer-logo-2.svg"
              alt="The Baked Fantasy"
              className="h-40 w-40 mb-2 animate-wiggle"
            />

            {/* <h2 className="text-3xl md:text-4xl leading-tight uppercase gliker">
            The Baked Fantasy
          </h2> */}

            <h2 className="text-3xl md:text-4xl font-bold leading-tight uppercase">
              Where every <br />
              treat is a little <br />
              <span className="text-pink-400">slice of heaven</span>
            </h2>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 md:max-w-100 rounded-md bg-white/10 placeholder-white/70 outline-none flex-1"
            />
            <button className="bg-white text-black px-5 py-3 rounded-md hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>

          <p className="text-sm mt-3 text-white/70">
            We won’t flood your inbox, just sweet updates and offers!
          </p>
        </div>

        {/* CENTER - QUICK LINKS */}
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 place-items-center">
            <div>
              <h3 className="font-semibold mb-4 uppercase text-sm tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-2 text-white/80">
                <Link to="/" className="hover:text-white cursor-pointer block">
                  Homepage
                </Link>
                <Link to="/about" className="hover:text-white cursor-pointer block">
                  About us
                </Link>
                <Link to="/categories" className="hover:text-white cursor-pointer block">
                  Bakery
                </Link>
                <Link
                  to="/ess-categories"
                  className="hover:text-white cursor-pointer block"
                >
                  Essentials
                </Link>
                <Link to="/courses" className="hover:text-white cursor-pointer block">
                  Courses
                </Link>
              </ul>
            </div>

            {/* RIGHT LINKS */}
            <div>
              <h3 className="font-semibold mb-4 uppercase text-sm tracking-wide">
                Customer Support
              </h3>
              <ul className="space-y-2 text-white/80">
                <Link to="/contact" className="hover:text-white block cursor-pointer">
                  Contact Us
                </Link>
                <Link to="/profile" className="hover:text-white block cursor-pointer">
                  My Profile
                </Link>
                <Link to="/cart" className="hover:text-white block cursor-pointer">
                  My Cart
                </Link>
                <Link
                  to="/courses/my-learning"
                  className="hover:text-white block cursor-pointer"
                >
                  My Learning
                </Link>
                <Link to="/" className="hover:text-white block cursor-pointer">
                  Returns & Refunds
                </Link>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE TEXT */}
          <div className="flex justify-center items-center">
            <div></div>
            <div className="flex flex-col w-full justify-between items-center pb-5">
              <p className="text-white/70 text-sm text-right">
                There is nothing to hide!
              </p>

              <div className="flex justify-end gap-6 mt-6 text-white/80">
                <div className="text-xs flex gap-5 max-w-40">
                  <ColorPicker />
                  No artificial colors added
                </div>
                <div className="text-xs flex gap-5 max-w-40">
                  <Chemical /> No chemicals in our bakes
                </div>
                <div className="text-xs flex gap-5 max-w-40">
                  <Flavour /> No artificial flavors used
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* BOTTOM SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-white/70 gap-4">
        {/* LEFT */}
        <div className="flex flex-wrap gap-4">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
          {/* <span className="hover:text-white cursor-pointer">Cookie Policy</span> */}
          {/* <span className="hover:text-white cursor-pointer">Allergen Info</span> */}
          {/* <span className="hover:text-white cursor-pointer">Nutritional Info</span> */}
        </div>

        {/* CENTER */}
        <div className="text-center">
          Design by{" "}
          <a
            className="font-bold"
            target="_blank"
            rel="noopener noreferrer"
            href="https://iunoware.com"
          >
            Iunoware Pvt Ltd
          </a>{" "}
          Copyright © {new Date().getFullYear()}. All Rights Reserved.
        </div>

        {/* RIGHT - SOCIAL */}
        <div className="flex flex-col gap-4 text-lg">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/profile.php?id=61579791417066"
          >
            Facebook
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/thebakedfantasy?igsh=MTJmNThhMnk4MHRmMA=="
          >
            Instagram
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=thebakedfantasy.6@gmail.com"
          >
            Mail
          </a>
        </div>
      </div>
    </footer>
  );
}
