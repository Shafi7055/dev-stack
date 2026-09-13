import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar stackCount={0} />
      <main>
        <Banner />
      </main>
    </div>
  );
}

export default App;


