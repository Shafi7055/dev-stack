import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    toast.success(`Successfully signed ${showAuthModal === 'signup' ? 'up' : 'in'} as ${email}!`, {
      theme: 'light',
    });
    setShowAuthModal(null);
    setEmail('');
    setPassword('');
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
                onClick={() => setShowAuthModal('signin')}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowAuthModal('signup')}
                className="gradient-btn px-5 py-2 rounded-full text-xs font-semibold shadow-sm cursor-pointer hover:opacity-90 transition-all"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setShowAuthModal('signup')}
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
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowAuthModal('signin');
                }}
                className="w-full py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowAuthModal('signup');
                }}
                className="w-full gradient-btn py-2.5 rounded-full text-center text-xs font-semibold"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Dummy Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-6 relative border border-slate-100 animate-fadeIn">
            <button
              onClick={() => setShowAuthModal(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-xl gradient-bg mx-auto flex items-center justify-center text-white font-bold text-sm mb-3">
                DS
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {showAuthModal === 'signup' ? 'Create an Account' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-slate-500">
                {showAuthModal === 'signup'
                  ? 'Join DevStack to save and export your stacks'
                  : 'Enter your credentials to access your account'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full gradient-btn py-2.5 rounded-full text-xs font-bold shadow-md cursor-pointer mt-2"
              >
                {showAuthModal === 'signup' ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              {showAuthModal === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setShowAuthModal('signin')}
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setShowAuthModal('signup')}
                    className="text-pink-600 font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
