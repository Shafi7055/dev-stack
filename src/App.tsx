import { useState, useEffect } from 'react';
import type { TechnologyType } from './types';
import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';
import { TechCards } from './components/TechCards';
import { YourStack } from './components/YourStack';
import { Footer } from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [technologies, setTechnologies] = useState<TechnologyType[]>([]); // state to hold the list of technologies fetched from the JSON file
  const [selectedStack, setSelectedStack] = useState<TechnologyType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { // here task is to fetch the list of technologies when the component mounts . mounts means 
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
      toast.info(`${tech.name} is already in your stack!`, {
        position: 'top-right',
        autoClose: 2500, 
        theme: 'light', 
      });
      return;
    }
    setSelectedStack((prev) => [...prev, tech]);
    toast.success(`${tech.name} added to your stack!`, {
      position: 'top-right',
      autoClose: 2000,
      theme: 'light',
    });
  };

  const handleRemoveFromStack = (techId: string) => {
    const removedTech = selectedStack.find((t) => t.id === techId);
    setSelectedStack((prev) => prev.filter((tech) => tech.id !== techId));
    if (removedTech) {
      toast.info(`${removedTech.name} removed from stack`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'light',
      });
    }
  };

  const handleClearStack = () => {
    if (selectedStack.length === 0) return;
    setSelectedStack([]);
    toast.info('Stack cleared!', {
      position: 'top-right',
      autoClose: 2000,
      theme: 'light',
    });
  };

  const selectedTechIds = selectedStack.map((item) => item.id);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between antialiased">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
          <Banner /> // it has no opening and closing tags, so it should be self-closing because 

          {/* Main Content Layout: Grid + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Tech Cards (8 Cols on Desktop) */}
            <div className="lg:col-span-8">
              <TechCards 
                isLoading={isLoading} 
                error={error}
                selectedTechIds={selectedTechIds}
                onAddToStack={handleAddToStack}
                technologies={technologies}
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

      <Footer />

      {/* Toast Notification Container */}
      <ToastContainer 
        toastClassName="!bg-white !border !border-slate-200 !text-slate-800 !rounded-xl !font-sans !shadow-lg text-xs font-medium"
      />
    </div>
  );
}

export default App;
