"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const projects = [
  {
    id: 1,
    title: "Portfolio",
    year: "2024",
    image: "/portfolio.png",
    githubUrl: "https://github.com/raunak-sadana/portfolio-v3",
    liveUrl: "/",
    isInternal: true
  },
  {
    id: 2,
    title: "PHI SAVER",
    year: "2024",
    image: "/phisaver.png",
    githubUrl: "https://github.com/raunak6531/phi-saver",
    liveUrl: "https://phi-saver-savingapp.vercel.app/"
  }
];

export function Projects() {
  const backgroundImageRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    // Preload images
    projects.forEach((project) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = project.image;
    });
  }, []);

  const handleProjectHover = (imageUrl: string) => {
    const backgroundImage = backgroundImageRef.current;
    if (!backgroundImage) return;

    // Reset transform and transition
    backgroundImage.style.transition = "none";
    backgroundImage.style.transform = "scale(1.2)";

    // Immediately show the new image
    backgroundImage.src = imageUrl;
    backgroundImage.style.opacity = "1";

    // Force browser to acknowledge the scale reset before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Re-enable transition and animate to scale 1.0
        backgroundImage.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        backgroundImage.style.transform = "scale(1.0)";
      });
    });


  };

  const handleProjectLeave = () => {
    const backgroundImage = backgroundImageRef.current;
    if (backgroundImage) {
      backgroundImage.style.opacity = "0";
    }
  };

  const handleProjectClick = (project: typeof projects[0]) => {
    if (project.isInternal) {
      router.push(project.liveUrl);
    } else {
      window.open(project.liveUrl, '_blank');
    }
  };

  return (
    <section id="projects" className="min-h-screen relative overflow-hidden">
      {/* Background image container */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
        <img
          ref={backgroundImageRef}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
          style={{ transform: 'scale(1.2)' }}
          crossOrigin="anonymous"
          alt=""
        />
      </div>

      {/* Main container */}
      <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-4xl px-8">
          {/* Projects Heading */}
          <motion.h1
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontWeight: 700,
              fontSize: '3rem',
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: '#f8f5f2'
            }}
          >
            Projects
          </motion.h1>

          {/* Projects container */}
          <div
            className="w-full max-w-2xl mx-auto relative z-10 max-h-[60vh] overflow-y-auto px-5 py-8 scrollbar-hide"
            onMouseLeave={handleProjectLeave}
          >

            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-item relative flex justify-between items-center py-3 border-b border-white/10 cursor-pointer group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.06,
                  ease: "easeOut"
                }}
                onMouseEnter={() => {
                  handleProjectHover(project.image);
                  setHoveredProject(project.id);
                }}
                onMouseLeave={() => {
                  handleProjectLeave();
                  setHoveredProject(null);
                }}
                onClick={() => handleProjectClick(project)}
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 700,
                  fontSize: '1.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  color: '#f8f5f2'
                }}
              >
                {/* Animated background fill */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-white pointer-events-none"
                  initial={{ height: 0 }}
                  animate={{
                    height: hoveredProject === project.id ? '100%' : 0
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  style={{ zIndex: 1 }}
                />

                {/* Project title */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    color: hoveredProject === project.id ? '#000000' : '#f8f5f2'
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {project.title}
                </motion.div>

                {/* Project year */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    color: hoveredProject === project.id ? '#000000' : '#f8f5f2'
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {project.year}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

