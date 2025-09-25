import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Separator } from "../components/ui/separator.jsx";
// import { Eye, EyeOff, Mail, Lock, ArrowLeft, X } from "lucide-react";
import Heading from "../components/Heading.jsx";

function Contact() {
  return (
    <>
      <div className="bg">
        <div className="min-h-screen bg-[#FFF5E1] py-16 page-transition">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get in touch with us for courses, orders, or any questions you
                may have
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
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
                      <button className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white py-3 rounded-lg font-medium transition-colors btn-hover">
                        Send Message
                      </button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#00BCD4] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">📍</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Address</p>
                          <p className="text-muted-foreground">
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
                          <p className="font-medium text-foreground">Phone</p>
                          <p className="text-muted-foreground">
                            (555) 123-BAKE
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#00BCD4] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">✉️</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Email</p>
                          <p className="text-muted-foreground">
                            info@sweetdreamsbaking.com
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#FF80AB] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm">🕒</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Hours</p>
                          <p className="text-muted-foreground">
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
      </div>
    </>
  );
}

export default Contact;
