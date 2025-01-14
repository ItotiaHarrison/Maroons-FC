import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-black/20 backdrop-blur-sm"}`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="/"
            className={`text-2xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}
          >
            Team Logo
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`${isScrolled ? "text-gray-900" : "text-white"} ${!isScrolled && "hover:bg-white/20"}`}
                >
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] bg-white/95 backdrop-blur-sm">
                    <NavigationMenuLink
                      href="/facilities"
                      className="text-gray-900 hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      Facilities
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      href="/history"
                      className="text-gray-900 hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      Club History
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      href="/team"
                      className="text-gray-900 hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      Team
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      href="/statistics"
                      className="text-gray-900 hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      Statistics
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`${isScrolled ? "text-gray-900" : "text-white"} ${!isScrolled && "hover:bg-white/20"}`}
                >
                  Matches
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] bg-white/95 backdrop-blur-sm">
                    <NavigationMenuLink
                      href="/fixtures"
                      className="text-gray-900 hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      Fixtures
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      href="/results"
                      className="text-gray-900 hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      Results
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      href="/standings"
                      className="text-gray-900 hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      League Table
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a
                  href="/gallery"
                  className={`px-4 py-2 rounded-md transition-colors ${isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/20"}`}
                >
                  Gallery
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <Button
              variant={isScrolled ? "ghost" : "secondary"}
              size="icon"
              className={
                !isScrolled
                  ? "bg-white/10 hover:bg-white/20"
                  : "hover:bg-gray-100"
              }
            >
              <ShoppingCart
                className={isScrolled ? "text-gray-900" : "text-white"}
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            <Button
              className={
                !isScrolled ? "bg-white text-gray-900 hover:bg-white/90" : ""
              }
            >
              <Ticket className="mr-2 h-4 w-4" />
              Buy Tickets
            </Button>
            {!isLoggedIn ? (
              <Button
                variant={isScrolled ? "outline" : "secondary"}
                className={
                  !isScrolled
                    ? "bg-white/10 hover:bg-white/20 text-white border-white"
                    : ""
                }
              >
                Sign In
              </Button>
            ) : (
              <Button
                variant={isScrolled ? "ghost" : "secondary"}
                className={
                  !isScrolled ? "bg-white/10 hover:bg-white/20 text-white" : ""
                }
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
                  href="/history"
                  className="text-lg hover:text-primary transition-colors"
                >
                  Club History
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
                  href="/standings"
                  className="text-lg hover:text-primary transition-colors"
                >
                  League Table
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
