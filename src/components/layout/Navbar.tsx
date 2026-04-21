import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Trophy, PenLine, Moon, Sun, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/use-theme';
import { Logo } from './Logo';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'Library', path: '/library', icon: <Book className="w-4 h-4 mr-2" /> },
    { name: 'Ranking', path: '/ranking', icon: <Trophy className="w-4 h-4 mr-2" /> },
    { name: 'Publish', path: '/dashboard', icon: <PenLine className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-2 group shrink-0">
            <div className="flex items-center justify-center transition-transform group-hover:scale-110">
              <Logo />
            </div>
            <span className="text-2xl font-black tracking-tighter text-emerald-600 font-sans">Inkwell</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-emerald-500" />
            <Input 
              placeholder="Search stories..."
              className="pl-10 h-10 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-emerald-600 rounded-full"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`flex items-center text-sm font-medium transition-colors hover:text-emerald-600 ${
                    location.pathname === link.path ? 'text-emerald-600' : 'text-muted-foreground'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4 border-l pl-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button className="rounded-full px-6 bg-emerald-600 hover:bg-emerald-700 text-white">Login</Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search stories..."
                className="pl-10 h-11 bg-muted/50 border-transparent rounded-xl"
              />
            </div>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="flex items-center py-2 text-lg font-medium text-foreground hover:text-emerald-600"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Button className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700 text-white">Login</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};