import React from 'react';

const ProjectsHero = () => {
  return (
    <section className="projects-hero bg-black bg-center py-32" style={{backgroundImage:'url(https://e0.pxfuel.com/wallpapers/846/344/desktop-wallpaper-portfolio-thumbnail.jpg)', backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundAttachment:'fixed', backgroundblur:'20px'}}>
      <div className="container mx-auto text-center text-white">
        <h1 className="text-5xl font-bold mb-4">My Projects</h1>
        <p className="text-xl">Showcasing my work and accomplishments</p>
      </div>
    </section>
  );
};

export default ProjectsHero;