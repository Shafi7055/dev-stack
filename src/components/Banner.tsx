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
    <section id="hero" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Build Your Ideal <br />
              <span className="gradient-text">Development Stack</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleExplore}
                className="gradient-btn px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-sm cursor-pointer hover:opacity-90 transition-all"
              >
                Explore Technologies
              </button>

              <button
                onClick={handleExplore}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-2xs"
              >
                Learn More
              </button>
            </div>

          </div>

          {/* Right Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-none">
              <img
                src={bannerImg}
                alt="Development Stack Illustration"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
