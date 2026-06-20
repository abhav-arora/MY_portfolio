import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="resume"><Resume /></section>
        <section id="portfolio"><Portfolio /></section>
        <section id="contact"><Contact /></section>
      </main>

      <Footer />
    </div>
  );
}

export default App;