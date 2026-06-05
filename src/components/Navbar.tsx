import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Spacer for non-home pages to match navbar height */}
      {location.pathname !== "/" && <div className="h-[96px]" />}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMobileMenuOpen || location.pathname !== "/"
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-4 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className={`transition-all duration-300 overflow-hidden flex items-center justify-center bg-white rounded shadow-sm ${
                scrolled ? "w-12 h-12 p-1" : "w-16 h-16 p-2"
              }`}
            >
              <img fetchPriority="high" 
                src="https://i.ibb.co/Y4pqNnfb/IMG-20260406-WA0014-removebg-preview.png"
                alt="IMANIGLOBAL AGRO Logo"
                className="w-full h-full object-contain scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-display font-bold uppercase tracking-[0.2em] transition-colors ${
                  scrolled || isMobileMenuOpen || location.pathname !== "/"
                    ? "text-black"
                    : "text-white"
                }`}
              >
                IMANIGLOBAL
              </span>
              <span
                className={`text-[10px] uppercase tracking-widest font-semibold transition-colors ${
                  scrolled || isMobileMenuOpen || location.pathname !== "/"
                    ? "text-gray-500"
                    : "text-gray-300"
                }`}
              >
                Agro Limited
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary relative group ${
                    scrolled || location.pathname !== "/"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=447379352882"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  scrolled || location.pathname !== "/"
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                Order Now
              </a>
            </li>
          </ul>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors ${
                scrolled || isMobileMenuOpen || location.pathname !== "/"
                  ? "text-black"
                  : "text-white"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-8 flex flex-col gap-6 md:hidden shadow-xl animate-in slide-in-from-top-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black text-lg font-display font-medium uppercase tracking-wider border-b border-gray-100 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://api.whatsapp.com/send?phone=447379352882"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full mt-4 bg-black text-white px-6 py-4 text-center rounded text-sm font-bold uppercase tracking-widest"
            >
              Start WhatsApp Order
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
