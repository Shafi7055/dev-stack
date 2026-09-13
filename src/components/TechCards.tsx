import { useState } from 'react';
import type { TechnologyType } from '../types';
import { Star, Plus, Check, Search, Filter, Sparkles, AlertCircle } from 'lucide-react';

interface TechCardsProps {
  technologies: TechnologyType[];
  isLoading: boolean;
  error: string | null;
  selectedTechIds: string[];
  onAddToStack: (tech: TechnologyType) => void;
}

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Language', 'Styling', 'DevOps', 'Tools'];

export const TechCards = ({
  technologies,
  isLoading,
  error,
  selectedTechIds,
  onAddToStack,
}: TechCardsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTechnologies = technologies.filter((tech) => {
    const matchesCategory = selectedCategory === 'All' || tech.category === selectedCategory;
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner-Friendly':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Advanced':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div id="tech-grid" className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-900/60 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-400" />
            Explore Technologies
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Browse our curated index of tools and add them to your personalized stack.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-1 mr-2 hidden sm:block" />
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'gradient-bg text-white shadow-md shadow-pink-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6 space-y-4 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-800" />
                <div className="w-16 h-6 rounded-full bg-slate-800" />
              </div>
              <div className="h-6 w-3/4 bg-slate-800 rounded-lg" />
              <div className="h-16 w-full bg-slate-800/60 rounded-xl" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-5 w-20 bg-slate-800 rounded" />
                <div className="h-10 w-28 bg-slate-800 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-3xl p-8 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-lg font-bold text-rose-200">Failed to Load Technologies</h3>
          <p className="text-sm text-rose-300/80 max-w-md mx-auto">{error}</p>
        </div>
      )}

      {/* Empty Search Results */}
      {!isLoading && !error && filteredTechnologies.length === 0 && (
        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Search className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-slate-300">No Technologies Found</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            We couldn't find any tools matching "{searchQuery}" in the selected category.
          </p>
        </div>
      )}

      {/* Grid of Technology Cards */}
      {!isLoading && !error && filteredTechnologies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnologies.map((tech) => {
            const isAdded = selectedTechIds.includes(tech.id);

            return (
              <div
                key={tech.id}
                className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-pink-500/5 hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 p-2.5 flex items-center justify-center shadow-inner group-hover:border-slate-700 transition-colors">
                      <img
                        src={tech.icon}
                        alt={`${tech.name} icon`}
                        className="w-full h-full object-contain filter drop-shadow"
                        onError={(e) => {
                          // Fallback icon placeholder if image fails to load
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {tech.badge && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800/90 text-pink-300 border border-pink-500/20 shadow-sm">
                        {tech.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Category Chip */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                        {tech.name}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-400 font-medium">
                        {tech.category}
                      </span>
                    </div>

                    {/* Rating & Difficulty */}
                    <div className="flex items-center gap-3 pt-1 text-xs">
                      <div className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{tech.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-slate-600">•</span>
                      <span
                        className={`px-2 py-0.5 rounded-md font-medium border ${getDifficultyBadgeColor(
                          tech.difficulty
                        )}`}
                      >
                        {tech.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                    {tech.description}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={() => onAddToStack(tech)}
                    disabled={isAdded}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-not-allowed opacity-80'
                        : 'gradient-btn shadow-md hover:shadow-pink-500/20'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        ✓ Added to Stack
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add to Stack
                      </>
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
