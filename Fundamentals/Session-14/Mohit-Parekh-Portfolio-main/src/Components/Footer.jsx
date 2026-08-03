import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
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
    <footer className="bg-black text-white pt-14 pb-4 px-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2"><a onClick={handleScroll} href="/" className="hover:underline text-center">Home</a></li>
            <li className="mb-2"><a onClick={handleScroll} href="#about" className="hover:underline text-center">About</a></li>
            <li className="mb-2"><a onClick={handleScroll} href="#Skills" className="hover:underline text-center">Skills</a></li>
            <li className="mb-2"><a onClick={handleScroll} href="#contact" className="hover:underline text-center">Contact</a></li>
            <li className="mb-2"><a onClick={handleScroll} href="/projects" className="hover:underline text-center">Projects</a></li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0 ">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="mb-2 cursor-pointer"><FaEnvelope className="text-2xl text-center" />
            <Link to={'Gmail:-mohitparekh2002@gmail.com'} className="mt-2 text-center hover:underline hover:decoration-black transition duration-3 ease underline decoration-white" target="_blank" rel="noopener noreferrer" >mohitparekh2002@gmail.com</Link></p>
          <p className="mb-2 cursor-pointer"><FaPhone className="text-2xl text-center" /><Link to={'tel:+91-704637719'} className=" mt-2 text-center hover:underline hover:decoration-black transition duration-3 ease underline decoration-white" target="_blank" rel="noopener noreferrer" >+91-7046377191</Link></p>
          <p className="mb-2 cursor-pointer"><FaMapMarkerAlt className="text-2xl text-center" />
            <Link to={"https://www.google.com/maps/place/Vapi-Ambach+Rd,+Gujarat/@20.3890204,72.9722686,45a,75y,195.42h,45.28t/data=!3m7!1e1!3m5!1s94GrIuDPEuSGHF0ZvA083w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D44.72370683612701%26panoid%3D94GrIuDPEuSGHF0ZvA083w%26yaw%3D195.41543540560772!7i16384!8i8192!4m10!1m2!2m1!1sVapi+ambach!3m6!1s0x3be0ce544eb2ba8b:0x2da9eea30595d7e8!8m2!3d20.3890519!4d72.9722923!15sCgtWYXBpIGFtYmFjaJIBBXJvdXRl4AEA!16s%2Fg%2F1hjgjfsdq?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"} className="mt-2 text-center hover:underline hover:decoration-black transition duration-3 ease underline decoration-white" target="_blank" rel="noopener noreferrer" >Vapi</Link></p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Follow Me</h2>
          <div className="flex space-x-4">
            <a href="https://github.com/MPAREKH27?tab=repositories" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-2xl hover:text-black hover:bg-white" />
            </a>
            <a href="https://www.linkedin.com/in/mohit-parekh-9540b4244/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl hover:text-blue-600 hover:bg-white" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>© 2025 Mohit Parekh. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
