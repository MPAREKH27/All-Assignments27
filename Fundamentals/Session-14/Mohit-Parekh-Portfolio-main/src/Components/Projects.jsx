import React from 'react';
import ProjectsHero from './ProjectHero';
import projectJson from '../Projects/Projects.json';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Projects = () => {
  const projects = projectJson;

  return (
    <>
      <ProjectsHero />
      <section className="projects bg-gradient-to-br from-blue-100 via-white to-blue-100 py-16">
        <div className="container mx-auto px-2 lg:px-12">
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`w-full flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8  ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg overflow-hidden md:py-16 md:px-10`}
              >
                {/* Project Image */}
                <div className="w-full md:w-1/2 h-64 overflow-hidden rounded-2xl">
                  <img
                    src={require(`../Assets/${project.image}`)}
                    alt={project.title}
                    className="h-[280px] max-sm:h-[200px] w-full object-cover rounded-2xl hover:scale-x-105 cursor-pointer transition-all duration-300 ease-in-out"
                    loading="lazy"
                    decoding="async"
                    style={{ color: 'transparent' }}
                  />
                </div>

                {/* Project Content */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center md:items-start text-center md:text-left max-md:flex-col">
                  <h2 className="text-2xl font-bold text-blue-600 group-hover:text-blue-800 transition-colors mb-4">
                    {project.title}
                  </h2>
                  <p className="text-gray-700 text-justify mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start font-bold text-sm mb-4">
                    {(project.technologies || []).map((tech, techIndex) => (
                      <span key={techIndex} className="text-center px-[6px] py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-5">
                    <a
                      target="_blank"
                      className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-all duration-100"
                      href={project.githubLink}
                    >
                      <p className="font-semibold font-montserrat text-sm">Code</p>
                      <FaGithub className="text-[25px] cursor-pointer text-black" />
                    </a>
                    <a
                      target="_blank"
                      className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-all duration-100"
                      href={project.liveLink}
                    >
                      <p className="font-semibold font-montserrat text-sm">Live Preview</p>
                      <FaExternalLinkAlt className="text-[22px] cursor-pointer text-black" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
