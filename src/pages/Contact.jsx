import { SquareCheckBig, MailCheck } from "lucide-react";
import Heading from "../components/Heading.jsx";

function Contact() {
  const name = "umar";
  const age = "20";
  const degree = "B.com";
  return (
    <>
      <div className="bg">
        <div className="pt-40 md:pt-10"></div>
        <div className="min-h-screen md:pt-16 pb-10 page-transition">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 fade-in">
              <Heading title=" Contact Us" className="!text-blue" />

              <p className="text-lg pt-3 text-blue text-muted-foreground max-w-2xl mx-auto">
                Get in touch with us for courses, orders, or any questions you
                may have
              </p>
            </div>

            <div className="max-w-[70vw] shadow-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-card p-8 fade-in-delay-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Send us a message
                    </h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4] transition-all"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4] transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4] transition-all"
                      />
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4] transition-all"
                      />
                      {/* <button className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white py-3 rounded-lg font-medium transition-colors btn-hover">
                        Send Message
                      </button> */}
                      <a
                        className="w-full text-black group justify-center relative inline-flex items-center overflow-hidden rounded-sm bg-[#F9C7C2] px-8 py-3 font-bold focus:ring-3 focus:outline-hidden mr-3"
                        href="#"
                      >
                        <span className="absolute -start-full transition-all group-hover:start-4">
                          <MailCheck size="20" />
                        </span>

                        <span className="text-sm font-bold transition-all group-hover:ms-4">
                          Send Message
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col items-center-safe">
                    <h2 className="text-xl  font-semibold text-foreground mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#00BCD4] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">📍</span>
                        </div>
                        <div>
                          <p className="text-xl font-medium text-foreground">
                            Address
                          </p>
                          <p className="text-muted-foreground text-lg">
                            123 Baker Street, Culinary District
                            <br />
                            New York, NY 10001
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#FF80AB] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">📞</span>
                        </div>
                        <div>
                          <p className="text-xl font-medium text-foreground">
                            Phone
                          </p>
                          <p className="text-muted-foreground text-lg">
                            (555) 123-BAKE
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#00BCD4] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">✉️</span>
                        </div>
                        <div>
                          <p className="text-xl font-medium text-foreground">
                            Email
                          </p>
                          <p className="text-muted-foreground text-lg">
                            info@sweetdreamsbaking.com
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#FF80AB] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">🕒</span>
                        </div>
                        <div>
                          <p className="font-medium text-xl text-foreground">
                            Hours
                          </p>
                          <p className="text-muted-foreground text-lg">
                            Mon-Fri: 6:00 AM - 8:00 PM
                            <br />
                            Sat-Sun: 7:00 AM - 6:00 PM
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
                  <strong className="text-pink-400">Bulk Orders</strong> for
                  Every Occasion increase
                </h1>

                <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                  Order bulk cakes and desserts for birthdays, weddings, or
                  corporate events. We deliver fresh, delicious treats in large
                  quantities—perfect for making every celebration memorable.
                </p>

                <div className="mt-4 flex gap-4 sm:mt-6">
                  <a
                    className="group relative inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
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
