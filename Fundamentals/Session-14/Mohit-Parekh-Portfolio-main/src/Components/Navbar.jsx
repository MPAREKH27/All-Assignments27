import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLinkedin, FaPhone } from 'react-icons/fa';

const navLinks = [
  { title: 'Home', link: '/',  scrollTo: 'Skills' },
  { title: 'Skills', link: '#Skills', scrollTo: 'Skills' },
  { title: 'About', link: '#about',  scrollTo: 'About' },
  { title: 'Contact', link: '#contact',  scrollTo: 'Contact' },
  { title: 'Projects', link: '/projects'},
];

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleScroll = (scrollTo) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Adjust the timeout as needed
  };

  return (
    <nav className="fixed bg-[rgba(0,0,0,0.7)] shadow-lg shadow-blue-600 p-3 navbar relative h-16 text-white z-100">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-3">
          <h1 className='text-blue-600 text-3xl'>Mohit Parekh</h1>
        </a>
        <button className="menu-icon lg:hidden z-50" onClick={handleShowNavbar}>
          {showNavbar ? (
            <X size={28} className="text-white" />
          ) : (
            <Menu size={28} className="text-white" />
          )}
        </button>
        <div
          className={`nav-elements navbar bg-[rgba(0,0,0,0.9)] fixed inset-0 z-40 h-screen w-screen transform transition-transform duration-300 ease-in-out lg:relative lg:right-auto lg:top-auto lg:h-auto lg:w-auto lg:translate-x-0 lg:bg-transparent ${
            showNavbar ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="mt-16 flex flex-col space-y-8 px-6 py-6 lg:mt-0 lg:flex-row lg:space-x-8 lg:space-y-0 lg:px-0 text-center">
            {navLinks.map(({ title, link, isRoute, scrollTo }, index) => (
              <li key={index} className="group">
                 
                  <a
                    href={link}
                    className="relative p-2 text-lg font-medium transition-all duration-300 ease-in-out hover:text-blue-600 lg:text-base"
                    onClick={() => {
                      setShowNavbar(false);
                      handleScroll(scrollTo);
                    }}
                  >
                    {title}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </a>
             
              </li>
            ))}
            <div className="mt-4 flex justify-center space-x-4 lg:mt-0 lg:justify-end">
              <Link to={'Gmail-:mohitparekh2002@gmail.com'} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
                <FaEnvelope size={24} />
              </Link>
              <Link to="https://www.linkedin.com/in/mohit-parekh-9540b4244/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
                <FaLinkedin size={24} />
              </Link>
              <Link to="tel:+91-7046377191" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
                <FaPhone size={24} />
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;