import { useState, useEffect } from 'react';
import type { TechnologyType } from './types';
import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';
import { TechCards } from './components/TechCards';
import { YourStack } from './components/YourStack';

function App() {
  const [technologies, setTechnologies] = useState<TechnologyType[]>([]);
  const [selectedStack, setSelectedStack] = useState<TechnologyType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/technologies.json');
        if (!response.ok) {
          throw new Error(`Failed to load technologies (Status: ${response.status})`);
        }
        const data: TechnologyType[] = await response.json();
        setTechnologies(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching technology data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  const handleAddToStack = (tech: TechnologyType) => {
    if (selectedStack.some((item) => item.id === tech.id)) {
      return;
    }
    setSelectedStack((prev) => [...prev, tech]);
  };

  const handleRemoveFromStack = (techId: string) => {
    setSelectedStack((prev) => prev.filter((tech) => tech.id !== techId));
  };

  const handleClearStack = () => {
    setSelectedStack([]);
  };

  const selectedTechIds = selectedStack.map((item) => item.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar stackCount={selectedStack.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        <Banner />

        {/* Main Content Layout: Grid + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tech Cards (8 Cols on Desktop) */}
          <div className="lg:col-span-8">
            <TechCards
              technologies={technologies}
              isLoading={isLoading}
              error={error}
              selectedTechIds={selectedTechIds}
              onAddToStack={handleAddToStack}
            />
          </div>

          {/* Your Stack Sidebar (4 Cols on Desktop) */}
          <div className="lg:col-span-4">
            <YourStack
              stack={selectedStack}
              onRemoveFromStack={handleRemoveFromStack}
              onClearStack={handleClearStack}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
