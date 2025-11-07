/* eslint-disable no-unused-vars */
import {
  SquareCheckBig,
  MailCheck,
  MapPinCheck,
  PhoneCall,
  Mail,
  Clock9,
} from "lucide-react";
import Heading from "../components/Heading.jsx";
import toast from "react-hot-toast";

function Contact() {
  // const name = "umar";
  // const age = "20";
  // const degree = "B.com";
  const token = "";

  function handleInput(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const number = "919003710091";

    if (!name || !email || !subject || !message) {
      toast.error("Please fill all the details");
      return;
    }

    const formData = new FormData();
    formData.append("title", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    const text =
      `*New Inquiry Received*\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject}\n` +
      `Message: ${message}`;

    const encodedText = encodeURIComponent(text);

    const whatsappURL = `https://wa.me/${number}?text=${encodedText}`;

    window.open(whatsappURL, "_blank");
  }

  return (
    <>
      <div className="bg">
        <div className="pt-40 md:pt-10"></div>
        <div className="min-h-screen md:pt-16 pb-10 page-transition">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 fade-in">
              <Heading title=" Contact Us" />

              <p className="text-xl pt-3 text-gray-900 text-muted-foreground max-w-2xl mx-auto">
                Get in touch with us for courses, orders, or any questions you may have
              </p>
            </div>

            <div className="max-w-[70vw] shadow-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-card p-8 fade-in-delay-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Send us a message
                    </h2>
                    <form onSubmit={handleInput} className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870D32] transition-all"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870D32] transition-all"
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870D32] transition-all"
                      />
                      <textarea
                        placeholder="Your Message"
                        name="message"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870D32] transition-all"
                      />
                      {/* <button className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white py-3 rounded-lg font-medium transition-colors btn-hover">
                        Send Message
                      </button> */}
                      <button
                        type="submit"
                        className="w-full cursor-pointer text-white group justify-center relative inline-flex items-center overflow-hidden rounded-lg new-primary-bg px-8 py-3 font-bold focus:ring-3 focus:outline-hidden mr-3"
                      >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                          <MailCheck size="20" />
                        </span>

                        <span className="text-lg font-bold transition-all group-hover:ms-4">
                          Send Message
                        </span>
                      </button>
                    </form>
                  </div>

                  <div className="flex flex-col items-center-safe">
                    <h2 className="text-xl  font-semibold text-foreground mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <a
                        href="https://maps.app.goo.gl/LTWYRQ9R5etirRqYA"
                        target="_blank"
                        className="flex items-start space-x-3"
                      >
                        <div className="w-8 h-8 new-primary-bg  rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">
                            <MapPinCheck className="p-1" />
                          </span>
                        </div>
                        <div>
                          <p className="text-xl font-medium text-foreground">Address</p>
                          <p className="text-muted-foreground text-lg">
                            Jeevana school road, Jai nagar 2nd street, Ponmeni, Bypass
                            Road, Madurai - 625016
                          </p>
                        </div>
                      </a>

                      <a
                        href="tel:+916379240125"
                        target="_blank"
                        className="flex items-start space-x-3"
                      >
                        <div className="w-8 h-8 new-primary-bg rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">
                            <PhoneCall className="p-1" />
                          </span>
                        </div>
                        <div>
                          <p className="text-xl font-medium text-foreground">Phone</p>
                          <p className="text-muted-foreground text-lg">+91 637924012</p>
                        </div>
                      </a>

                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=thebakedfantasy.6@gmail.com"
                        target="_blank"
                        className="flex items-start space-x-3"
                      >
                        <div className="w-8 h-8 new-primary-bg rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">
                            <Mail className="p-1" />
                          </span>
                        </div>
                        <div>
                          <p className="text-xl font-medium text-foreground">Email</p>
                          <p className="text-muted-foreground text-lg">
                            thebakedfantasy.6@gmail.com
                          </p>
                        </div>
                      </a>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 new-primary-bg rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">
                            <Clock9 className="p-1" />
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-xl text-foreground">Hours</p>
                          <p className="text-muted-foreground text-lg">
                            Everyday: 9:00 AM - 5:30 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="lg:grid lg:place-content-center pb-10 ">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 px-8">
            <div className="textSide flex items-center md:order-1 order-2">
              <div className="max-w-prose text-left">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                  <strong className="new-primary-text">Bulk Orders</strong> for Every
                  Occasion increase
                </h1>

                <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                  Order bulk cakes and desserts for birthdays, weddings, or corporate
                  events. We deliver fresh, delicious treats in large quantities—perfect
                  for making every celebration memorable.
                </p>

                <div className="mt-4 flex gap-4 sm:mt-6">
                  <a
                    className="group relative inline-flex items-center overflow-hidden rounded-sm new-primary-bg px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                    href="#"
                  >
                    <span className="absolute -start-full transition-all group-hover:start-4">
                      <SquareCheckBig size="15" />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                      Book Now
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl h-[400px] overflow-hidden md:order-2 order-1">
              <img
                src="/images/event.jpg"
                alt="Birthday Event"
                className="rounded-xl h-[400px]  object-cover hover:scale-108 transition-all duration-200"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
