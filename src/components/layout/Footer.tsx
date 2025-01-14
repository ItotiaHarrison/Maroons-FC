import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">MAROON'S FC</h3>
            <p className="text-gray-400">Uthiru-based football club since 2019</p>
            <div className="flex space-x-4 mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/fixtures" className="text-gray-400 hover:text-white">
                  Fixtures
                </a>
              </li>
              
            </ul>
          </div>

          {/* Club */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Club</h3>
            <ul className="space-y-2">
              <li>
                <a href="/history" className="text-gray-400 hover:text-white">
                  History
                </a>
              </li>
              <li>
                <a
                  href="/facilities"
                  className="text-gray-400 hover:text-white"
                >
                  Facilities
                </a>
              </li>
              <li>
                <a href="/team" className="text-gray-400 hover:text-white">
                  Team
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="text-gray-400 not-italic">
              <p>Uthiru, Nairobi</p>
              <p>Ahiti grounds</p>
              <p>Email: maroonsfc32@gmail.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MAROON'S FC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
