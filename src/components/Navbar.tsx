import { useState } from 'react';
import { Layers, Menu, X, Sparkles, Code2, Bookmark, FileText } from 'lucide-react';

interface NavbarProps {
  stackCount?: number;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar = ({ stackCount = 0, onNavigate }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                DevStack <span className="gradient-text">Builder</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase -mt-1">
                Tech Aggregator
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            <button
              onClick={() => handleNavClick('hero')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all flex items-center gap-2"
            >
              <Code2 className="w-4 h-4 text-orange-400" />
              Overview
            </button>
            <button
              onClick={() => handleNavClick('tech-grid')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              Technologies
            </button>
            <button
              onClick={() => handleNavClick('your-stack')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all flex items-center gap-2 relative"
            >
              <Bookmark className="w-4 h-4 text-violet-400" />
              My Stack
              {stackCount > 0 && (
                <span className="badge badge-sm border-0 gradient-bg text-white font-bold ml-1 animate-pulse">
                  {stackCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('qa-section')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              React Q&A
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('tech-grid')}
              className="gradient-btn px-5 py-2.5 rounded-full text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Build Stack
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-pink-400" /> : <Menu className="w-6 h-6 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNavClick('hero')}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-xl"
          >
            <Code2 className="w-5 h-5 text-orange-400" />
            Overview
          </button>
          <button
            onClick={() => handleNavClick('tech-grid')}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-xl"
          >
            <Sparkles className="w-5 h-5 text-pink-400" />
            Technologies
          </button>
          <button
            onClick={() => handleNavClick('your-stack')}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-5 h-5 text-violet-400" />
              My Stack
            </div>
            {stackCount > 0 && (
              <span className="badge gradient-bg border-0 text-white font-bold">
                {stackCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('qa-section')}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-xl"
          >
            <FileText className="w-5 h-5 text-emerald-400" />
            React Q&A
          </button>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('tech-grid')}
              className="w-full gradient-btn py-3 rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Explore Technologies
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
