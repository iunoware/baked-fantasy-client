// import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { Ban, Pipette, FlaskConical, TestTube, MapPin, Phone, Mail } from "lucide-react";
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

export default function Footer() {
  return (
    <footer className="bg-pbrown text-white px-6 md:px-16 py-12">
      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-10 pb-5">
        {/* LEFT - BRAND + NEWSLETTER */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row justify-start md:items-center items-start gap-7">
            <img
              src="/images/footer-logo-3.svg"
              alt="The Baked Fantasy"
              className="h-40 w-40 mb-2"
            />

            {/* <h2 className="text-3xl md:text-4xl leading-tight uppercase gliker">
            The Baked Fantasy
          </h2> */}

            <h2 className="text-3xl md:text-4xl font-bold leading-tight uppercase">
              Where every <br />
              treat is a little <br />
              <span className="text-sbrown">slice of heaven</span>
            </h2>
          </div>

          {/* <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 md:max-w-100 rounded-md bg-white/10 placeholder-white/70 outline-none flex-1"
            />
            <button className="bg-white text-black px-5 py-3 rounded-md hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div> */}

          {/* <p className="text-sm mt-3 text-white/70">
            We won’t flood your inbox, just sweet updates and offers!
          </p> */}
          <div className="flex flex-col w-full justify-between items-start pb-5">
            <p className="text-white/70 text-sm text-center">There is nothing to hide!</p>

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

        {/* CENTER - QUICK LINKS */}
        <div className="flex flex-col gap-10">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-0 place-items-start">
            <div>
              <h3 className="font-semibold mb-4 uppercase text-md tracking-wide">
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
              <h3 className="font-semibold mb-4 uppercase text-md tracking-wide">
                Contact
              </h3>
              <ul className="space-y-3 text-white/80">
                <a
                  href="https://maps.app.goo.gl/LTWYRQ9R5etirRqYA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer flex gap-2"
                >
                  <div>
                    <MapPin className="inline" size={18} />
                  </div>
                  <div>
                    Jeevana school road, Jai nagar 2nd street, Bypass Rd, Ponmeni,
                    Madurai, Tamil Nadu 625016
                  </div>
                </a>

                <a
                  href="tel:+916379240125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer flex gap-2"
                >
                  <div>
                    <Phone className="inline" size={18} />
                  </div>
                  <div>+91 6379 240 125</div>
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=thebakedfantasy.6@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer flex gap-2"
                >
                  <div>
                    <Mail className="inline" size={18} />
                  </div>
                  <div>thebakedfantasy.6@gmail.com</div>
                </a>

                {/* <Link
                  to="/courses/my-learning"
                  className="hover:text-white block cursor-pointer"
                >
                  My Learning
                </Link> */}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE TEXT */}
          <div className="flex justify-center items-center">
            <div></div>
            {/* <div className="flex flex-col w-full justify-between items-center pb-5">
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
            </div> */}
          </div>
        </div>
      </div>

      <hr />

      {/* BOTTOM SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-white/70 gap-4">
        {/* LEFT */}
        <div className="flex flex-wrap gap-4 md:order-1 order-1">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
          {/* <span className="hover:text-white cursor-pointer">Cookie Policy</span> */}
          {/* <span className="hover:text-white cursor-pointer">Allergen Info</span> */}
          {/* <span className="hover:text-white cursor-pointer">Nutritional Info</span> */}
        </div>

        {/* CENTER */}
        <div className="text-center md:order-2 order-3">
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
        <div className="flex flex-col gap-4 text-lg md:order-3 order-2">
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

          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=thebakedfantasy.6@gmail.com"
          >
            Mail
          </a> */}
        </div>
      </div>
    </footer>
  );
}
