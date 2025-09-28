import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import aetheriumLogo from "@/assets/aetherium-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Главная", path: "/" },
    { name: "Правила", path: "/rules" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={aetheriumLogo} 
              alt="Aetherium" 
              className="h-10 w-auto float-animation"
            />
            <span className="hidden sm:block text-lg font-bold bg-gradient-to-r from-crystal to-gold bg-clip-text text-transparent">
              AETHERIUM
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-crystal"
                    : "text-foreground hover:text-crystal"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-crystal crystal-glow"></span>
                )}
              </Link>
            ))}
            
            <Button 
              asChild
              className="bg-gradient-to-r from-crystal to-primary hover:from-crystal-glow hover:to-crystal text-background font-medium crystal-glow"
            >
              <a 
                href="https://forms.gle/6DjRB2uywYb2P5C26" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Подать анкету
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-card/95 backdrop-blur-sm rounded-lg mt-2 mb-4`}>
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-crystal bg-muted/50"
                    : "text-foreground hover:text-crystal hover:bg-muted/30"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="px-4 pt-2">
              <Button 
                asChild
                className="w-full bg-gradient-to-r from-crystal to-primary hover:from-crystal-glow hover:to-crystal text-background font-medium"
                onClick={() => setIsOpen(false)}
              >
                <a 
                  href="https://forms.gle/6DjRB2uywYb2P5C26" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Подать анкету
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;