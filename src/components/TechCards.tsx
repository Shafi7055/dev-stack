import type { TechnologyType } from '../types';
import { Star, Check } from 'lucide-react';

interface TechCardsProps {
  technologies: TechnologyType[];
  isLoading: boolean;
  error: string | null;
  selectedTechIds: string[];
  onAddToStack: (tech: TechnologyType) => void;
}

export const TechCards = ({
  technologies,
  isLoading,
  error,
  selectedTechIds,
  onAddToStack,
}: TechCardsProps) => {
  const getBadgeStyle = (badgeColor?: string) => {
    switch (badgeColor) {
      case 'cyan':
        return 'bg-sky-50 text-sky-500 border-sky-100';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'amber':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'rose':
        return 'bg-rose-50 text-rose-500 border-rose-100';
      case 'sky':
        return 'bg-blue-50 text-blue-500 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div id="tech-grid" className="space-y-6">
      {/* Section Title & Subtitle */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore the <span className="gradient-text">Technologies</span>
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1 font-normal">
          Pick one technology per category to build your ideal stack.
        </p>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 animate-pulse shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-slate-100" />
                <div className="w-14 h-5 rounded-full bg-slate-100" />
              </div>
              <div className="h-5 w-1/2 bg-slate-100 rounded" />
              <div className="h-12 w-full bg-slate-50 rounded" />
              <div className="h-8 w-full bg-slate-100 rounded-lg" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 text-center text-rose-600 text-sm">
          Failed to load technologies: {error}
        </div>
      )}

      {/* Technology Cards Grid (3 Columns) */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {technologies.map((tech) => {
            const isAdded = selectedTechIds.includes(tech.id);

            return (
              <div
                key={tech.id}
                className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md group"
              >
                <div className="space-y-3">
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img
                        src={tech.icon}
                        alt={`${tech.name} icon`}
                        className="w-7 h-7 object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {tech.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getBadgeStyle(
                          tech.badgeColor
                        )}`}
                      >
                        {tech.badge}
                      </span>
                    )}
                  </div>

                  {/* Tech Name */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                    {tech.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-xs leading-relaxed min-h-[38px] line-clamp-3 font-normal">
                    {tech.description}
                  </p>

                  {/* Meta Tags Row: Category, Difficulty, Rating */}
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[10px]">
                        {tech.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[10px]">
                        {tech.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-slate-700 text-xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{tech.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4">
                  <button
                    onClick={() => onAddToStack(tech)}
                    disabled={isAdded}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-slate-950 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> 
                        Added to Stack
                      </>
                    ) : (
                      'Add to Stack'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
