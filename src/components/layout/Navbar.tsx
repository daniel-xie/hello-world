import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const navLinks = [
  { name: "📷", href: "/" },
  { name: "🎵", href: "/sounds" },
];

export function Navbar() {
  return (
    <nav className="w-full border-b bg-blue-50 px-4 py-3 mx-auto">
      <div className="flex items-center justify-between max-w-7xl">
        {/* Site Logo/Name */}
        <a href="/" className="text-xl font-bold">
          👋 Daniel Xie
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              className="text-gray-700 hover:text-gray-900 transition"
            >
              {name}
            </a>
          ))}
        </div>

        {/* Mobile Nav - Sheet + Hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden p-2">
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold">Menu</h2>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <X className="w-6 h-6" />
                </Button>
              </SheetTrigger>
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="text-gray-800 text-lg hover:text-gray-600"
                >
                  {name}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
