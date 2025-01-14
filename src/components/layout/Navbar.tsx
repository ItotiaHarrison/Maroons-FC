import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, Ticket } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  cartItemCount?: number;
}

const Navbar = ({ isLoggedIn = false, cartItemCount = 0 }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
            <Button
              variant={isScrolled ? "ghost" : "secondary"}
              size="icon"
              className="bg-white/10 hover:bg-white/20"
            >
              <ShoppingCart
                className="text-gray-900"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            <Button
              className="bg-white text-gray-900 hover:bg-white/90"
            >
              <Ticket className="mr-2 h-4 w-4" />
              Buy Tickets
            </Button>
            {!isLoggedIn ? (
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-gray-900 border-white"
              >
                Sign In
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="bg-white/10 hover:bg-white/20 text-gray-900"
              >
                My Account
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={isScrolled ? "ghost" : "secondary"}
                size="icon"
                className={!isScrolled ? "bg-white/10 hover:bg-white/20" : ""}
              >
                <Menu className={isScrolled ? "text-gray-900" : "text-white"} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                <a
                  href="/facilities"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Facilities
                </a>
                <a
                  href="/team"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Team
                </a>
                <a
                  href="/statistics"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Statistics
                </a>
                <a
                  href="/fixtures"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Fixtures
                </a>
                <a
                  href="/results"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Results
                </a>
                <a
                  href="/gallery"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Gallery
                </a>
                <div className="pt-4 flex flex-col space-y-4">
                  <Button>
                    <Ticket className="mr-2 h-4 w-4" />
                    Buy Tickets
                  </Button>
                  {!isLoggedIn ? (
                    <Button variant="outline">Sign In</Button>
                  ) : (
                    <Button variant="ghost">My Account</Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
