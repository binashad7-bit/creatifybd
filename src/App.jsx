import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Clients from './components/Clients';
import IntroBand from './components/IntroBand';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import CTABand from './components/CTABand';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Scroll reveal logic
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) e.target.classList.add('vis'); 
      });
    }, { threshold: 0.08 });

    const revealElements = document.querySelectorAll('.sr');
    revealElements.forEach(el => io.observe(el));

    return () => {
      revealElements.forEach(el => io.unobserve(el));
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Clients />
      <IntroBand />
      <Services />
      <Portfolio />
      <Process />
      <Features />
      <Pricing />
      <Testimonials />
      <CTABand />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
