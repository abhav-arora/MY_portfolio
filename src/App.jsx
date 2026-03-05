import React from 'react';
import Navbar from './components/layout/Navbar'; 
import Hero from './components/section/Hero'; 
import About from './components/section/About'; 
import Skills from './components/section/Skills';
import Projects from './components/section/Projects';
import Contact from './components/section/Contact';
import Footer from './components/layout/Footer';

function App() {
  return (

    <div className="min-h-screen overflow-x-hidden bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300">
      
      <Navbar />
      
      <main>
        <div id="home"><Hero /></div>
        <div id="about"><About /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="contact"><Contact /></div>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;