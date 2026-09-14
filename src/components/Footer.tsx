export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-white border-t border-slate-100 pt-12 pb-8 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Block (2 cols on Desktop) */}
          <div className="lg:col-span-2 space-y-3">   
            <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
              <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center text-white font-extrabold text-[10px]">
                DS
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight">
                DevStack
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-normal">
              Curated tools, technologies, and resources for developers building modern software.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-1 text-slate-600 font-medium">
              <a
                href="https://github.com/Shafi7055/dev-stack"
                target="_blank"
                rel="noopener noreferrer" // means 
                className="hover:text-slate-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Link Group 1: Product */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">PRODUCT</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <a href="#hero" className="hover:text-slate-900 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#tech-grid" className="hover:text-slate-900 transition-colors">
                  Technologies
                </a>
              </li>
              <li>
                <a href="#tech-grid" className="hover:text-slate-900 transition-colors">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Link Group 2: Company */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">COMPANY</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <a href="#hero" className="hover:text-slate-900 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:text-slate-900 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  Careers
                </span>
              </li>
            </ul>
          </div>

          {/* Link Group 3: Legal */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">LEGAL</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="pt-6 border-t border-slate-100 flex flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© 2026 Dev Stack. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
