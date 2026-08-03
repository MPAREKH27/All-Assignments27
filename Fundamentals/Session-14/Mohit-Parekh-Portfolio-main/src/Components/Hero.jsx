
// src/components/Hero.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaN } from 'react-icons/fa';
import { faReact, faNodeJs, faJsSquare, faHtml5, faCss3Alt, faGithub, faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { SiTailwindcss, SiBootstrap, SiMongodb } from 'react-icons/si';
import nextjs from '../Assets/next-js.svg'
import threejs from '../Assets/Three.js_Icon.svg.png'
import Typewriter from 'react-typewriter-effect';
import Profile from '../Assets/My Photo.png';
import { Link } from 'react-router-dom';


// Add the FontAwesome icons to the library
library.add(faReact, faNodeJs, faJsSquare, faHtml5, faCss3Alt, faGithub);

const skills = [
    { icon: faHtml5, name: 'HTML', color: '#E34F26' },
    { icon: faCss3Alt, name: 'CSS', color: '#1572B6' },
    { icon: faJsSquare, name: 'JavaScript', color: '#F7DF1E' },
    { icon: SiBootstrap, name: 'Bootstrap', color: '#7952B3' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#38B2AC' },
    // { icon: faNodeJs, name: 'Node.js', color: '#339933' },
    { icon: faReact, name: 'React', color: '#61DAFB' },
    // { icon: nextjs, name: 'Next.js', color: '' },//
    //{ icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    // { icon: threejs, name: 'Three.js', color: '' },
    { icon: faGithub, name: 'GitHub', color: '#181717' },
    { icon: faSearchengin, name: 'SEO', color: '#FF5722' },

];


const Hero = () => {


    // =========================== Contact Form Setting

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [messageSent, setMessageSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        formData.append('service_id', 'nexskyofficial@gmail.com');
        formData.append('template_id', 'template_csav9no');
        formData.append('user_id', 'yDwZwZ-kAczpTpQNw');
        formData.append('from_name', formData.get('name')); // Add sender's name
        formData.append('reply_to', formData.get('email')); // Add sender's email
        formData.append('message', formData.get('message')); // Add sender's message

        try {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Message sent successfully');
                setMessageSent(true);
                setErrorMessage('');
                setFormData({ name: '', email: '', message: '' }); // Clear the form
                setTimeout(() => setMessageSent(false), 3000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Oops... Something went wrong. Please try again later.');
        }
    };




    return (
        <>

            {/* ====================== Hero Section =======================*/}


            <section id='home' className="hero bg-black flex flex-col md:flex-row items-center justify-center text-center md:text-left text-white px-4 md:px-8 relative p-12 md:py-36 py-20"
            >
                <img className="rounded-full w-64 h-64 md:w-96 md:h-96  mt-3 md:mb-0 md:ml-8 order-1 md:order-2 shadow-xl shadow-blue-600" src={Profile} alt="Mohit Parekh" />

                <div className="px-2 hero-content max-w-4xl mx-auto mt-24 md:mt-0 order-2 md:order-1">
                    <Typewriter

                        textStyle={{ padding: '0px 14px', fontFamily: 'Arial', color: '#FFFFFF', fontWeight: 'bold', fontSize: window.innerWidth >= 768 ? '3rem' : '1.5rem' }}
                        startDelay={100}
                        cursorColor="#FFFFFF"
                        multiText={[
                            "Hi, I'm Mohit Parekh",
                            "MERN-Stack Developer",

                        ]}
                        multiTextDelay={1000}
                        typeSpeed={100}
                        deleteSpeed={50}
                        multiTextLoop
                    />

                    <p className="mt-4 text-lg md:text-2xl text-justify px-3">I am passionate about creating efficient and scalable web applications. With a strong background in both front-end and back-end development, I strive to deliver seamless user experiences.</p>

                    <div className="mt-10 flex flex-col gap-4 justify-center items-center  space-x-6">

                        <div className='flex gap-8'>
                            <a href="https://github.com/MPAREKH27?tab=repositories" target="_blank" rel="noopener noreferrer">
                                <FaGithub size="2em" className="text-white hover:text-black hover:bg-white" />
                            </a>

                            <a href="https://www.linkedin.com/in/mohit-parekh-9540b4244/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size="2em" className="text-white hover:text-blue-700 hover:bg-white" />
                            </a>
                        </div>

                        <div className='flex gap-2'>
                            <Link to={'/projects'}><button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">View My Work</button></Link>

                            <a href="/Mohit Parekh27.pdf" target='_blank'><button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Download CV</button></a>
                        </div>
                    </div>

                </div>
            </section>

            {/* ====================== Skills Section =======================*/}

            <section id='Skills' className="skills bg-gray-100 py-20 ">

                <div className="container mx-auto text-center">

                    <h2 className="text-3xl font-bold mb-8 text-blue-600">My Skills</h2>

                    <div className="flex flex-wrap justify-center items-center align-center">
                        {skills.map((skill, index) => (
                            <div key={index} className="m-4 flex flex-col items-center justify-center">
                                {skill.icon.prefix ? (
                                    <FontAwesomeIcon icon={skill.icon} size="3x" style={{ color: skill.color }} className="cursor-pointer zoom" />
                                ) : (
                                    <skill.icon size="3em" style={{ color: skill.color }} className="cursor-pointer zoom" />
                                )}
                                <p className="mt-2 text-lg">{skill.name}</p>
                            </div>
                        ))}
                        {/* <div className='m-4'>
                            <img src={nextjs} alt="next js" className='h-12 cursor-pointer zoom' />
                            <label htmlFor="nextjs" className='text-lg mt-2'>Next Js</label>
                        </div>
                        <div className='m-4'>
                            <img src={threejs} alt="three js" className='h-12 cursor-pointer zoom' />
                            <label htmlFor="nextjs" className='text-lg mt-2'>R3F</label>
                        </div> */}

                    </div>

                </div>

            </section>

            {/* ====================== About Section =======================*/}

            <section id="About" className="about bg-black text-white py-24" style={{ scrollMarginTop: '100px' }}>
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-center py-2">
                        <img
                            className="w-48 h-48 md:w-80 md:h-80 mb-6 md:mb-0 shadow-xl shadow-blue-600 rounded-full object-cover aspect-square"
                            src={Profile}
                            alt="Ali Khan"
                        />
                    </div>
                    <div className="w-full md:w-2/3 p-4 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                        <h2 className="text-4xl font-bold mb-6">About Me</h2>
                        <p className="text-lg mb-4 px-3 text-justify">
                            Hi, I’m Mohit Parekh, a passionate full stack developer currently pursuing a degree in Computer Software Engineering at UET Mardan. I am a third-semester student with a strong foundation in both front-end and back-end technologies.
                        </p>
                        <p className="text-lg mb-4 px-3 text-justify">
                            My key skills include proficiency in React, Next js, React three fiber (R3F), Node.js, Tailwind CSS, MongoDB, Express.js, JavaScript, and C++. I enjoy tackling complex problems and building unique projects that showcase my technical abilities and creativity.
                        </p>
                        <p className="text-lg mb-4 px-3 text-justify">
                            Looking ahead, I am eager to gain expertise in machine learning and artificial intelligence. My goal is to continuously learn and grow, taking on new challenges that push the boundaries of my knowledge and skills.
                        </p>
                        <p className="text-lg px-3 text-justify">
                            Let’s connect and collaborate on exciting projects that make a difference!
                        </p>
                        <Link to={'https://wa.me/923429327224'}>
                            <button
                                type="button"
                                className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mt-4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Connect
                            </button>
                        </Link>
                    </div>
                </div>
            </section>




            {/* ====================== Contact Section =======================*/}

            <section id='Contact' className='pt-6' style={{ scrollMarginTop: '160px' }}>

                <div className="relative body-background bg-gray-100 p-3 w-full">
                    <div className="absolute inset-0 bg-cover bg-center opacity-30"></div>
                    <div className="text-center m-12">

                        <h1 className='font-bold text-blue-600 text-3xl'>Contact <span className='text-blue-800'>& Work Together</span></h1>

                    </div>

                    <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mb-6">
                            <div className="flex flex-col items-center p-4 bg-blue-600 text-white rounded-lg shadow-lg text-center">
                                <FaPhone className="text-center text-2xl " />
                                <Link to={'tel:+91-7046377191'} className=" mt-2 text-center hover:underline hover:decoration-black transition duration-3 ease underline decoration-white" target="_blank" rel="noopener noreferrer" >+91-7046377191</Link>
                            </div>

                            <div className="flex flex-col items-center p-4 bg-blue-600 text-white rounded-lg shadow-lg">
                                <FaEnvelope className="text-2xl text-center" />
                                <Link to={'mailto:-mohitparekh2002@gmail.com'} className="mt-2 text-center hover:underline hover:decoration-black transition duration-3 ease underline decoration-white" target="_blank" rel="noopener noreferrer" >mohitparekh2002@gmail.com</Link>
                            </div>

                            <div className="flex flex-col items-center p-4 bg-blue-600 text-white rounded-lg shadow-lg">
                                <FaWhatsapp className="text-2xl text-center" />
                                <a href={'https://wa.me/923429327224'} className="mt-2 text-center hover:underline hover:decoration-black transition duration-3 ease underline decoration-white" target="_blank" rel="noopener noreferrer" >+91-7046377191</a>
                            </div>

                            <div className="flex flex-col items-center p-4 bg-blue-600 text-white rounded-lg shadow-lg">
                                <FaMapMarkerAlt />
                                <Link to={"https://www.google.com/maps/@20.3890204,72.9722686,45a,75y,195.42h,45.28t/data=!3m7!1e1!3m5!1s94GrIuDPEuSGHF0ZvA083w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D44.72%26panoid%3D94GrIuDPEuSGHF0ZvA083w%26yaw%3D195.42!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"} className="mt-2 text-center hover:underline hover:decoration-black transition duration-3 ease underline decoration-white" target="_blank" rel="noopener noreferrer" >Vapi</Link>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center justify-center">
                            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:mr-10">
                                <img src="https://media.istockphoto.com/id/1090878412/photo/smiling-businessman-pointing-right-with-two-hands-and-looking-at-camera-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=5B4-zJ6CtuZZ89rSr9STI7OqKCTVj4nqS1cLLSlmYcg=" alt="Contact Us" className="rounded-lg shadow-lg w-full h-full object-cover" />
                            </div>


                            <form onSubmit={handleSubmit} className="bg-black w-full max-w-lg p-4 rounded-lg shadow-lg">
                                <div className="mb-5">
                                    <label htmlFor="name" className="text-white block mb-2 text h_color">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md text-black"
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="text-white block mb-2 text h_color">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md text-black"
                                        required
                                    />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="message" className="text-white block mb-2 text h_color">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md text-black"
                                        required
                                    ></textarea>
                                </div>

                                {messageSent && <p className="text-green-500 mb-5">Message sent successfully!</p>}
                                {errorMessage && <p className="text-red-500 mb-5">{errorMessage}</p>}
                                <div className="flex justify-center">
                                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </>

    );
};

export default Hero;
