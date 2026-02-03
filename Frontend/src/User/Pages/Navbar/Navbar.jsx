
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SignOutModal from "../../Modals/SignOutModal";

export default function Navbar() {
  const PROMO_HEIGHT = 32; // px (h-8)
  const HEADER_HEIGHT = 80; // px (h-20)
  const [promoOpen, setPromoOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]); // Re-check on route change

  const handleLogoutConfirm = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    navigate("/login");
  };

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setShowLogoutModal(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // compute header top offset when promo is visible
  const headerTop = promoOpen ? `${PROMO_HEIGHT}px` : "0px";
  const spacerHeight = (promoOpen ? PROMO_HEIGHT : 0) + HEADER_HEIGHT;

  const handleScrollTo = (id) => {
    const scrollToSection = () => {
      const section = document.getElementById(id);
      if (section) {
        // Calculate position with offset for fixed header
        const yOffset = -100; // Header height + padding
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    if (location.pathname === "/") {
      // Already on homepage, scroll directly
      scrollToSection();
    } else {
      // Navigate to homepage, then scroll after slight delay
      navigate(`/#${id}`);
      setTimeout(() => {
        scrollToSection();
      }, 300); // 300ms delay to allow page to mount
    }
  };

  return (
    <>
      {/* Promo strip (fixed at very top) */}
      {promoOpen && (
        <div
          className="fixed top-0 left-0 w-full bg-black text-white z-50"
          style={{ height: `${PROMO_HEIGHT}px` }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center relative">
            <div className="text-sm">
              Sign up and get 20% off your first order.{" "}
              {!isLoggedIn && (
                <Link to="/login" className="underline font-medium">
                  Sign Up Now
                </Link>
              )}
            </div>

            <button
              onClick={() => setPromoOpen(false)}
              aria-label="Close promo"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main header (fixed below promo when present) */}
      <header
        className="fixed left-0 w-full bg-white z-40"
        style={{ top: headerTop, height: `${HEADER_HEIGHT}px` }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full">
            {/* Left: Logo + Links */}
            <div className="flex items-center gap-12">
              <div className="flex-shrink-0 text-2xl font-extrabold tracking-tight">
                <Link to="/" className="inline-block">SHOP.CO</Link>
              </div>

              <nav className="hidden lg:flex items-center gap-10 text-base text-gray-700">
                <Link to="/shop" className="hover:text-black">Shop</Link>
                <Link to="/onsale" className="hover:text-black">On Sale</Link>
                <button onClick={() => handleScrollTo("newarrival")} className="hover:text-black">New Arrivals</button>
                <button onClick={() => handleScrollTo("topselling")} className="hover:text-black">Top Selling</button>
              </nav>
            </div>

            {/* Center: large rounded search (desktop) */}
            <div className="flex-1 hidden lg:flex justify-center px-16">
              <div className="w-full max-w-xl">
                <label htmlFor="site-search" className="sr-only">Search products</label>
                <div className="relative">
                  <input
                    id="site-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        navigate(`/search?q=${query}`);
                        setQuery(''); // Clear the input field after search
                      }
                    }}
                    placeholder="Search for products..."
                    className="w-full h-12 rounded-full border border-gray-200 bg-gray-100 px-4 pl-12 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: icons + mobile hamburger */}
            <div className="ml-auto flex items-center gap-0">
              <div className="hidden lg:flex items-center gap-6">
                <Link to="/cart" aria-label="Cart" className="text-gray-700 hover:text-black">
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                <Link to={isLoggedIn ? "/profile" : "/login"} aria-label={isLoggedIn ? "Profile" : "Login"} className="text-gray-700 hover:text-black">
                  <User className="w-6 h-6" />
                </Link>
                {isLoggedIn && (
                  <button onClick={() => setShowLogoutModal(true)} aria-label="Sign Out" className="text-gray-700 hover:text-red-500">
                    <LogOut className="w-6 h-6" />
                  </button>
                )}
              </div>

              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileOpen((s) => !s)}
                  aria-expanded={mobileOpen}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  data-testid="menu-button"
                  className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div
            data-testid="mobile-menu"
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="mobile-search" className="sr-only">Search</label>
                  <div className="relative">
                    <input
                      id="mobile-search"
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for products..."
                      className="w-full h-10 rounded-full border border-gray-200 bg-gray-100 px-4 pl-11 placeholder-gray-500 focus:outline-none"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <nav className="flex flex-col space-y-2 text-base">
                  <Link to="/shop" onClick={() => setMobileOpen(false)} className="py-2 text-gray-700 hover:text-black">Shop</Link>
                  <Link to="/onsale" onClick={() => setMobileOpen(false)} className="py-2 text-gray-700 hover:text-black">On Sale</Link>
                  <button onClick={() => { handleScrollTo("newarrival"); setMobileOpen(false); }} className="text-left py-2 text-gray-700 hover:text-black">New Arrivals</button>
                  <button onClick={() => { handleScrollTo("topselling"); setMobileOpen(false); }} className="text-left py-2 text-gray-700 hover:text-black">Top Selling</button>

                  <div className="flex items-center space-x-4 pt-2 border-t border-gray-100 mt-4">
                    <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-black">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Cart</span>
                    </Link>
                    <Link to={isLoggedIn ? "/profile" : "/login"} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-black">
                      <User className="w-5 h-5" />
                      <span>{isLoggedIn ? "Profile" : "Login"}</span>
                    </Link>
                    {isLoggedIn && (
                      <button onClick={() => { setShowLogoutModal(true); setMobileOpen(false); }} className="flex items-center gap-2 text-gray-700 hover:text-red-500">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so page content isn't hidden (promo height + header height) */}
      <div style={{ height: `${spacerHeight}px` }} aria-hidden />

      {/* Global Sign Out Modal */}
      <SignOutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
