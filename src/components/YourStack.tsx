import type { TechnologyType } from '../types';
import { Layers, Trash2, X, Sparkles, Inbox, ShieldCheck } from 'lucide-react';

interface YourStackProps {
  stack: TechnologyType[];
  onRemoveFromStack: (techId: string) => void;
  onClearStack: () => void;
}

export const YourStack = ({ stack, onRemoveFromStack, onClearStack }: YourStackProps) => {
  const count = stack.length;

  // Group by category for stack stats
  const categoryStats = stack.reduce((acc, tech) => {
    acc[tech.category] = (acc[tech.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div id="your-stack" className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-6 sticky top-24 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Your Stack</h3>
            <p className="text-xs text-slate-400">
              {count} {count === 1 ? 'Technology' : 'Technologies'} Selected
            </p>
          </div>
        </div>

        {count > 0 && (
          <button
            onClick={onClearStack}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove All
          </button>
        )}
      </div>

      {/* Empty State */}
      {count === 0 ? (
        <div className="py-12 px-4 text-center space-y-4 bg-slate-950/50 rounded-2xl border border-dashed border-slate-800">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Inbox className="w-8 h-8 text-pink-400/60" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-200 text-base">Your Stack is Empty</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              Click <span className="text-pink-400 font-semibold">"Add to Stack"</span> on any technology card to begin building your custom dev stack.
            </p>
          </div>
        </div>
      ) : (
        /* Selected Stack List */
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
          {stack.map((tech) => (
            <div
              key={tech.id}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center shrink-0">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="truncate">
                  <h5 className="font-bold text-sm text-white truncate group-hover:text-pink-300 transition-colors">
                    {tech.name}
                  </h5>
                  <span className="text-[11px] font-medium text-slate-400">
                    {tech.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onRemoveFromStack(tech.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0 ml-2"
                title={`Remove ${tech.name} from stack`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stack Summary Stats (shown when items exist) */}
      {count > 0 && (
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Stack Categories
            </span>
            <span className="text-slate-300 font-bold">{Object.keys(categoryStats).length} Types</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {Object.entries(categoryStats).map(([cat, cnt]) => (
              <span
                key={cat}
                className="px-2.5 py-1 rounded-lg bg-slate-950 text-[11px] font-medium text-slate-300 border border-slate-800 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                {cat}: <strong className="text-white">{cnt}</strong>
              </span>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Stack architecture verified for production deployment.</span>
          </div>
        </div>
      )}
    </div>
  );
};
