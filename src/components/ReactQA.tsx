import { useState } from 'react';
import { HelpCircle, ChevronDown, BookOpen, Code, CheckCircle2 } from 'lucide-react';

interface QAItem {
  id: number;
  question: string;
  answer: string;
  exampleSnippet?: string;
}

const QA_ITEMS: QAItem[] = [
  {
    id: 1,
    question: "1. What is JSX, and why is it used in React?",
    answer: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows developers to write HTML-like markup directly inside JavaScript files. It makes writing UI components intuitive, visual, and expressive by combining layout structure with application logic in one single file.",
    exampleSnippet: "const element = <h1 className=\"gradient-text\">Hello DevStack!</h1>;",
  },
  {
    id: 2,
    question: "2. What is the difference between props and state?",
    answer: "Props (short for properties) are read-only input parameters passed down from a parent component to a child component. State is internal data managed dynamically within a component that can change over time based on user interactions, triggering a re-render when updated.",
    exampleSnippet: "// Props: passed from Parent to Child\n<Navbar stackCount={stack.length} />\n\n// State: managed inside component\nconst [stack, setStack] = useState<TechnologyType[]>([]);",
  },
  {
    id: 3,
    question: "3. What does the useState hook do, and where did you use it in this project?",
    answer: "The useState hook declares reactive state variables in functional components. In this project, it is used in App.tsx to store selected tech items (selectedStack), loaded technologies (technologies), loading status (isLoading), and search query filters (searchQuery).",
    exampleSnippet: "const [selectedStack, setSelectedStack] = useState<TechnologyType[]>([]);",
  },
  {
    id: 4,
    question: "4. What does the useEffect hook do, and why did you need it to load the JSON data?",
    answer: "The useEffect hook handles side effects in functional components such as data fetching, subscriptions, or DOM mutations. In this project, it executes once after component mount to fetch technologies.json asynchronously from the public folder.",
    exampleSnippet: "useEffect(() => {\n  fetch('/technologies.json')\n    .then(res => res.json())\n    .then(data => setTechnologies(data));\n}, []);",
  },
  {
    id: 5,
    question: "5. Why does every item in a .map() list need a unique key prop?",
    answer: "React uses the unique key prop to identify which list elements have changed, been added, or removed during re-renders. It allows React's Virtual DOM reconciliation algorithm to perform efficient DOM updates without re-rendering the entire list.",
    exampleSnippet: "{technologies.map((tech) => (\n  <TechCard key={tech.id} tech={tech} />\n))}",
  },
  {
    id: 6,
    question: "6. What is conditional rendering? Show one place you used it.",
    answer: "Conditional rendering dynamically renders different UI elements based on runtime boolean conditions. In this project, it is used in YourStack.tsx to render an empty state message when stack.length === 0, or the list of selected tools when items exist.",
    exampleSnippet: "{stack.length === 0 ? (\n  <EmptyStackMessage />\n) : (\n  <StackItemList stack={stack} />\n)}",
  },
  {
    id: 7,
    question: "7. How do you pass data between parent and child components?",
    answer: "Data flows downward from parent to child via props. To send data back from a child to a parent, the parent passes a callback function as a prop, which the child invokes when an event occurs (e.g. onAddToStack).",
    exampleSnippet: "// Parent (App.tsx)\n<TechCards onAddToStack={handleAddToStack} />\n\n// Child (TechCards.tsx)\n<button onClick={() => onAddToStack(tech)}>Add</button>",
  },
];

export const ReactQA = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="qa-section" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              React Architecture Q&A
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Core conceptual concepts & code explanations for this project.
            </p>
          </div>
        </div>

        <span className="hidden sm:flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-pink-300 border border-pink-500/20">
          <HelpCircle className="w-3.5 h-3.5" /> 7 Questions Answered
        </span>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {QA_ITEMS.map((qa) => {
          const isOpen = openId === qa.id;

          return (
            <div
              key={qa.id}
              className="bg-slate-950 border border-slate-800/90 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(qa.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-white hover:text-pink-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {qa.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-pink-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm space-y-3 border-t border-slate-900">
                  <p className="leading-relaxed">{qa.answer}</p>
                  {qa.exampleSnippet && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-pink-200 overflow-x-auto flex items-start gap-2">
                      <Code className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                      <pre className="whitespace-pre-wrap">{qa.exampleSnippet}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
