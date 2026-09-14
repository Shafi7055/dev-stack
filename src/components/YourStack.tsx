import type { TechnologyType } from '../types';
import { X, Trash2 } from 'lucide-react';

interface YourStackProps {
  stack: TechnologyType[];
  onRemoveFromStack: (techId: string) => void;
  onClearStack: () => void;
}

export const YourStack = ({ stack, onRemoveFromStack, onClearStack }: YourStackProps) => {
  const count = stack.length;

  return (
    <div
      id="your-stack"
      className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs space-y-4 sticky top-20"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-slate-900">Your Stack</h3>
          <p className="text-xs text-slate-400 font-normal">
            {count === 0 ? 'No technologies selected yet.' : `${count} ${count === 1 ? 'technology' : 'technologies'} selected.`}
          </p>
        </div>

        {count > 0 && (
          <button
            onClick={onClearStack}
            className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Empty State Box */}
      {count === 0 ? (
        <div className="py-8 px-4 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-xs text-slate-400 font-normal">Your stack is empty.</p>
        </div>
      ) : (
        /* Selected Stack List */
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          {stack.map((tech) => (
            <div
              key={tech.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-5 h-5 object-contain shrink-0"
                />
                <div className="truncate">
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    {tech.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {tech.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onRemoveFromStack(tech.id)}
                className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-slate-200/50 transition-colors cursor-pointer shrink-0"
                title={`Remove ${tech.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
