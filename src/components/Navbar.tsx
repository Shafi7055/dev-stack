import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 

  const handleNavClick = (tabName: string, sectionId: string) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  return (
    <> 
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer select-none" 
              onClick={() => handleNavClick('Home', 'hero')}
            >
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
                DS
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                DevStack
              </span>
            </div>

            {/* Center Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: 'Home', section: 'hero' },
                { name: 'Technologies', section: 'tech-grid' },
                { name: 'Projects', section: 'tech-grid' },
                { name: 'About', section: 'hero' },
                { name: 'Contact', section: 'footer' },
              ].map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.name, item.section)}
                    className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                      isActive ? 'text-pink-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions: Sign In & Sign Up */}
            <div className="hidden md:flex items-center gap-6"> 
              <button
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer" // transition-colors means
              >
                Sign In
              </button>
              <button
                className="gradient-btn px-5 py-2 rounded-full text-xs font-semibold shadow-sm cursor-pointer hover:opacity-90 transition-all"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <button
                className="gradient-btn px-4 py-1.5 rounded-full text-xs font-semibold"
              >
                Sign Up
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-3 pb-6 space-y-3">
            {[
              { name: 'Home', section: 'hero' },
              { name: 'Technologies', section: 'tech-grid' },
              { name: 'Projects', section: 'tech-grid' },
              { name: 'About', section: 'hero' },
              { name: 'Contact', section: 'footer' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name, item.section)}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:text-pink-600 hover:bg-slate-50 rounded-lg"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                className="w-full py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Sign In
              </button>
              <button
                className="w-full gradient-btn py-2.5 rounded-full text-center text-xs font-semibold"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
