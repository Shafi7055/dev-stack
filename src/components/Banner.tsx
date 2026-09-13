import { Sparkles, ArrowRight, Layers, ShieldCheck, Cpu, Zap } from 'lucide-react';
import bannerImg from '../assets/banner-stack.png';

interface BannerProps {
  onExploreClick?: () => void;
}

export const Banner = ({ onExploreClick }: BannerProps) => {
  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const element = document.getElementById('tech-grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-500/20 via-pink-500/20 to-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-pink-500/30 text-xs font-semibold text-pink-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Next-Gen Developer Toolkit 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Architect Your <br className="hidden sm:inline" />
              <span className="gradient-text">Ultimate Tech Stack</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover, curate, and assemble industry-leading frontend, backend, database, and DevOps tools into your custom stack architecture with interactive real-time selection.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleExplore}
                className="gradient-btn w-full sm:w-auto px-8 py-3.5 rounded-2xl text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 cursor-pointer hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 text-white" />
                Explore Technologies
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="https://github.com/Shafi7055/dev-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-base font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-5 h-5 text-violet-400" />
                View Repository
              </a>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <div className="flex items-center gap-1.5 text-orange-400 font-bold text-lg sm:text-xl">
                  <Zap className="w-4 h-4" /> 15+
                </div>
                <span className="text-xs text-slate-400 font-medium">Curated Tools</span>
              </div>

              <div className="flex flex-col items-center lg:items-start space-y-1">
                <div className="flex items-center gap-1.5 text-pink-400 font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-4 h-4" /> 100%
                </div>
                <span className="text-xs text-slate-400 font-medium">Production Ready</span>
              </div>

              <div className="flex flex-col items-center lg:items-start space-y-1">
                <div className="flex items-center gap-1.5 text-violet-400 font-bold text-lg sm:text-xl">
                  <Cpu className="w-4 h-4" /> Live
                </div>
                <span className="text-xs text-slate-400 font-medium">Stack Sync</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative group w-full max-w-md lg:max-w-none">
              {/* Card Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden">
                <img
                  src={bannerImg}
                  alt="DevStack Ecosystem Banner"
                  className="w-full h-auto object-cover rounded-2xl transform transition duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
