
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Footer from './Components/Footer';
import Projects from './Components/Projects';

function App() {
  return (

    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Hero />} />
          <Route exact path="/projects" element={<Projects />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
