import { useState, useEffect } from 'react';
import type { TechnologyType } from './types';
import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';
import { TechCards } from './components/TechCards';

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

  const selectedTechIds = selectedStack.map((item) => item.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar stackCount={selectedStack.length} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        <Banner />
        <TechCards
          technologies={technologies}
          isLoading={isLoading}
          error={error}
          selectedTechIds={selectedTechIds}
          onAddToStack={handleAddToStack}
        />
      </main>
    </div>
  );
}

export default App;
