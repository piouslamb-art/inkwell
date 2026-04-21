import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  const location = useLocation();
  
  // Hide footer on reader pages to avoid conflict with persistent bottom bar
  if (location.pathname.startsWith('/reader/')) {
    return null;
  }

  return (
    <footer className="bg-muted/30 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="flex items-center justify-center transition-transform group-hover:scale-110">
                <Logo />
              </div>
              <span className="text-xl font-black tracking-tighter text-emerald-600 font-sans">Inkwell</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A premium platform for readers and writers to discover, share, and immerse themselves in captivating stories.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/ranking" className="hover:text-emerald-600 transition-colors">Rankings</Link></li>
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">New Releases</Link></li>
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">Popular</Link></li>
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">Genres</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">Help Center</Link></li>
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">Writing Guide</Link></li>
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for the latest updates.</p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-background border rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">
                Join
              </button>
            </div>
            <div className="flex space-x-4 mt-8">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground space-y-4 md:space-y-0">
          <p>\u00a9 2024 Inkwell. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-emerald-600 cursor-pointer">English (US)</span>
            <span className="hover:text-emerald-600 cursor-pointer">USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};