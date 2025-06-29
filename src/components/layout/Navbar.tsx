
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
         <img 
    src="/logo.png"
    alt="Bikie Logo" 
    className="h-8 w-8 object-contain"
  />
          <span className="text-primary font-bold text-2xl">Bikie</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/vehicles" className="font-medium hover:text-primary transition-colors">
            Vehicles
          </Link>
          <Link to="/booking" className="font-medium hover:text-primary transition-colors">
            Book Now
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button asChild variant="secondary">
            <Link to="/booking">Book Your Ride</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-slide-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="py-2 px-4 hover:bg-gray-100 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/vehicles" 
              className="py-2 px-4 hover:bg-gray-100 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Vehicles
            </Link>
            <Link 
              to="/booking" 
              className="py-2 px-4 hover:bg-gray-100 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
            <Button asChild variant="secondary" className="w-full">
              <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                Book Your Ride
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
