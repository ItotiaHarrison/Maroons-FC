import React, { useEffect, useState } from "react";
import { Menu, ShoppingCart, Ticket, X } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  cartItemCount?: number;
}

const Navbar = ({ isLoggedIn = false, cartItemCount = 0 }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-gray-900">
            MAROON'S FC
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <a
              href="/facilities"
              className="px-4 py-2 rounded-md transition-colors text-gray-900 hover:bg-gray-100"
            >
              Facilities
            </a>
            <a
              href="/team"
              className="px-4 py-2 rounded-md transition-colors text-gray-900 hover:bg-gray-100"
            >
              Team
            </a>
            <a
              href="/statistics"
              className="px-4 py-2 rounded-md transition-colors text-gray-900 hover:bg-gray-100"
            >
              Statistics
            </a>
            <a
              href="/fixtures"
              className="px-4 py-2 rounded-md transition-colors text-gray-900 hover:bg-gray-100"
            >
              Fixtures
            </a>
            <a
              href="/results"
              className="px-4 py-2 rounded-md transition-colors text-gray-900 hover:bg-gray-100"
            >
              Results
            </a>
            <a
              href="/gallery"
              className="px-4 py-2 rounded-md transition-colors text-gray-900 hover:bg-gray-100"
            >
              Gallery
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-md relative ${
                isScrolled ? "hover:bg-gray-100" : "hover:bg-white/20"
              }`}
            >
              <ShoppingCart className="text-gray-900 h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="inline-flex items-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors">
              <Ticket className="mr-2 h-4 w-4" />
              Buy Tickets
            </button>
            {!isLoggedIn ? (
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors">
                Sign In
              </button>
            ) : (
              <button className="px-4 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors">
                My Account
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`p-2 rounded-md ${
              isScrolled ? "hover:bg-gray-100" : "hover:bg-white/20"
            }`}
          >
            <Menu className="text-gray-900 h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-[300px] bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-4">
                  <a
                    href="/facilities"
                    className="text-lg text-gray-900 hover:text-primary transition-colors"
                  >
                    Facilities
                  </a>
                  <a
                    href="/team"
                    className="text-lg text-gray-900 hover:text-primary transition-colors"
                  >
                    Team
                  </a>
                  <a
                    href="/statistics"
                    className="text-lg text-gray-900 hover:text-primary transition-colors"
                  >
                    Statistics
                  </a>
                  <a
                    href="/fixtures"
                    className="text-lg text-gray-900 hover:text-primary transition-colors"
                  >
                    Fixtures
                  </a>
                  <a
                    href="/results"
                    className="text-lg text-gray-900 hover:text-primary transition-colors"
                  >
                    Results
                  </a>
                  <a
                    href="/gallery"
                    className="text-lg text-gray-900 hover:text-primary transition-colors"
                  >
                    Gallery
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-4">
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                    <Ticket className="mr-2 h-4 w-4" />
                    Buy Tickets
                  </button>
                  {!isLoggedIn ? (
                    <button className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors">
                      Sign In
                    </button>
                  ) : (
                    <button className="w-full px-4 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors">
                      My Account
                    </button>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
