"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const projects = [
  {
    id: 1,
    title: "PORTFOLIO",
    year: "2024",
    description: "Personal portfolio showcasing my work and skills",
    githubUrl: "https://github.com/raunak-sadana/portfolio-v3",
    liveUrl: "/",
    isInternal: true,
    tech: ["React", "Next.js", "Tailwind CSS", "Three.js"],
    image: "/portfolio.png",
    leftLabels: ["MODERN DESIGN", "RESPONSIVE LAYOUT", "INTERACTIVE UI"],
    rightLabels: ["CLEAN CODE", "OPTIMIZED PERFORMANCE", "SEAMLESS UX"]
  },
  {
    id: 2,
    title: "PHI SAVER",
    year: "2024",
    description: "A modern savings app with smart financial tracking",
    githubUrl: "https://github.com/raunak6531/phi-saver",
    liveUrl: "https://phi-saver-savingapp.vercel.app/",
    isInternal: false,
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: "/phisaver.png",
    leftLabels: ["FINANCIAL TRACKING", "SMART SAVINGS", "USER ANALYTICS"],
    rightLabels: ["SECURE BACKEND", "REAL-TIME DATA", "INTUITIVE DESIGN"]
  }
];

export function Projects() {
  const router = useRouter();
  const projectsRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef<HTMLDivElement | null>(null);
  const isClickAllowedRef = useRef(true);

  const handleProjectClick = (project: typeof projects[0]) => {
    if (project.isInternal) {
      router.push(project.liveUrl);
    } else {
      window.open(project.liveUrl, '_blank');
    }
  };

  const handleGithubClick = (e: React.MouseEvent, githubUrl: string) => {
    e.stopPropagation();
    window.open(githubUrl, '_blank');
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create custom eases
    CustomEase.create("projectExpand", "0.42, 0, 1, 1");
    CustomEase.create("projectCollapse", "0, 0, 0.58, 1");
    CustomEase.create("textReveal", "0.25, 1, 0.5, 1");
    CustomEase.create("squareStretch", "0.22, 1, 0.36, 1");

    const projectItems = document.querySelectorAll(".project-item");
    let activeProject: HTMLElement | null = null;
    let isClickAllowed = true;

    // Set initial invisibility for staggered reveal
    gsap.set(projectItems, {
      opacity: 0,
      y: 20,
      scale: 0.97
    });

    // Staggered entrance animation
    const entranceTl = gsap.timeline({
      defaults: { ease: "power1.out" }
    });

    entranceTl.to(projectItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.35,
      stagger: 0.04,
      clearProps: "opacity,y,scale",
      onComplete: function () {
        gsap.set(projectItems, { clearProps: "all" });
      }
    });

    // Initialize text splitting and hover effects
    projectItems.forEach((project) => {
      const detailElements = project.querySelectorAll(".project-details p");
      detailElements.forEach((element) => {
        const originalText = element.textContent || "";
        element.innerHTML = "";
        const lineWrapper = document.createElement("div");
        lineWrapper.className = "line-wrapper";
        lineWrapper.style.overflow = "hidden";
        const lineElement = document.createElement("div");
        lineElement.className = "line";
        lineElement.textContent = originalText;
        lineWrapper.appendChild(lineElement);
        element.appendChild(lineWrapper);

        gsap.set(lineElement, {
          y: "100%",
          opacity: 0
        });
      });

      // Set up hover indicators
      const titleContainer = project.querySelector(".project-title-container");
      const leftIndicator = project.querySelector(".hover-indicator.left");
      const rightIndicator = project.querySelector(".hover-indicator.right");

      if (titleContainer && leftIndicator && rightIndicator) {
        gsap.set([leftIndicator, rightIndicator], {
          width: "0px",
          height: "8px",
          opacity: 0,
          x: (i: number) => i === 0 ? -10 : 10,
          zIndex: 20,
          background: "#f0ede8"
        });

        titleContainer.addEventListener("mouseenter", () => {
          if (project !== activeProject) {
            gsap.killTweensOf([leftIndicator, rightIndicator]);

            const leftTl = gsap.timeline();
            leftTl
              .set(leftIndicator, { opacity: 1, width: "0px" })
              .to(leftIndicator, { x: 0, width: "12px", duration: 0.15, ease: "power2.out" })
              .to(leftIndicator, { width: "8px", duration: 0.1, ease: "squareStretch" });

            const rightTl = gsap.timeline({ delay: 0.06 });
            rightTl
              .set(rightIndicator, { opacity: 1, width: "0px" })
              .to(rightIndicator, { x: 0, width: "12px", duration: 0.15, ease: "power2.out" })
              .to(rightIndicator, { width: "8px", duration: 0.1, ease: "squareStretch" });
          }
        });

        titleContainer.addEventListener("mouseleave", () => {
          if (project !== activeProject) {
            gsap.killTweensOf([leftIndicator, rightIndicator]);

            const leftTl = gsap.timeline();
            leftTl
              .to(leftIndicator, { width: "12px", duration: 0.1, ease: "power1.in" })
              .to(leftIndicator, { width: "0px", x: -10, opacity: 0, duration: 0.15, ease: "power2.in" });

            const rightTl = gsap.timeline({ delay: 0.03 });
            rightTl
              .to(rightIndicator, { width: "12px", duration: 0.1, ease: "power1.in" })
              .to(rightIndicator, { width: "0px", x: 10, opacity: 0, duration: 0.15, ease: "power2.in" });
          }
        });
      }
    });

    // Function to apply scaling
    const applyScaling = (activeIndex: number) => {
      projectItems.forEach((item, index) => {
        const titleContainer = item.querySelector(".project-title-container");
        const distance = Math.abs(index - activeIndex);

        if (index === activeIndex) {
          gsap.to(titleContainer, {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.3,
            ease: "projectExpand"
          });
        } else if (distance === 1) {
          gsap.to(titleContainer, {
            scale: 0.95,
            opacity: 0.7,
            filter: "blur(1px)",
            y: 0,
            duration: 0.3,
            ease: "projectExpand"
          });
        } else {
          gsap.to(titleContainer, {
            scale: 0.85,
            opacity: 0.3,
            filter: "blur(4px)",
            y: 0,
            duration: 0.3,
            ease: "projectExpand"
          });
        }
      });
    };

    // Function to reset scaling
    const resetScaling = () => {
      projectItems.forEach((item) => {
        const titleContainer = item.querySelector(".project-title-container");
        gsap.to(titleContainer, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.3,
          ease: "projectCollapse"
        });
      });
    };

    // Set initial states for images
    gsap.set(".image-wrapper img", {
      clipPath: "inset(100% 0 0 0)"
    });

    // Toggle project function
    const toggleProject = (project: Element) => {
      if (!isClickAllowed) return;
      isClickAllowed = false;
      setTimeout(() => { isClickAllowed = true; }, 300);

      if (activeProject === project) {
        // Close active project
        const content = project.querySelector(".project-content");
        const image = project.querySelector(".image-wrapper img");
        const details = project.querySelectorAll(".project-details .line");
        const title = project.querySelector(".project-title");

        gsap.to(title, {
          fontSize: "3rem",
          letterSpacing: "-0.02em",
          duration: 0.2,
          ease: "projectCollapse"
        });

        gsap.to(image, {
          clipPath: "inset(100% 0 0 0)",
          duration: 0.15,
          ease: "none"
        });

        gsap.to(details, {
          y: "100%",
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "projectCollapse"
        });

        gsap.to(content, {
          maxHeight: 0,
          opacity: 0,
          margin: 0,
          duration: 0.2,
          ease: "projectCollapse",
          onComplete: () => {
            activeProject = null;
            resetScaling();
            gsap.to(projectItems, {
              marginBottom: "1.5rem",
              duration: 0.3,
              ease: "projectExpand",
              stagger: 0.02
            });
          }
        });
      } else {
        // Open new project (close previous if exists)
        if (activeProject) {
          const oldContent = activeProject.querySelector(".project-content");
          const oldImage = activeProject.querySelector(".image-wrapper img");
          const oldDetails = activeProject.querySelectorAll(".project-details .line");
          const oldTitle = activeProject.querySelector(".project-title");

          gsap.to(oldTitle, { fontSize: "3rem", letterSpacing: "-0.02em", duration: 0.2, ease: "projectCollapse" });
          gsap.to(oldImage, { clipPath: "inset(100% 0 0 0)", duration: 0.15, ease: "none" });
          gsap.to(oldDetails, { y: "100%", opacity: 0, duration: 0.5, stagger: 0.05, ease: "projectCollapse" });
          gsap.to(oldContent, {
            maxHeight: 0,
            opacity: 0,
            margin: 0,
            duration: 0.2,
            ease: "projectCollapse",
            onComplete: () => openNewProject()
          });
        } else {
          openNewProject();
        }

        function openNewProject() {
          activeProject = project as HTMLElement;
          const activeIndex = Array.from(projectItems).indexOf(project);
          applyScaling(activeIndex);

          const content = project.querySelector(".project-content") as HTMLElement;
          const image = project.querySelector(".image-wrapper img");
          const details = project.querySelectorAll(".project-details .line");
          const title = project.querySelector(".project-title");

          // Pre-render content to get height
          gsap.set(content, { display: "flex", autoAlpha: 0, height: "auto", maxHeight: "none", overflow: "hidden" });
          const contentHeight = content.offsetHeight;
          gsap.set(content, { maxHeight: 0, height: "auto", autoAlpha: 0, overflow: "hidden" });

          const tl = gsap.timeline({ defaults: { ease: "projectExpand" } });

          tl.to(title, {
            fontSize: window.innerWidth > 768 ? "3.5rem" : "2.5rem",
            letterSpacing: "0.01em",
            duration: 0.35,
            ease: "projectExpand"
          }, 0);

          tl.to(content, {
            maxHeight: contentHeight,
            autoAlpha: 1,
            margin: "2rem 0",
            duration: 0.4,
            pointerEvents: "auto"
          }, 0);

          tl.to(image, {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.35,
            ease: "power2.out"
          }, 0.05);

          tl.to(details, {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "textReveal"
          }, 0.2);

          // Adjust spacing
          if (activeIndex > 0) {
            gsap.to(Array.from(projectItems).slice(0, activeIndex), {
              marginBottom: "0.5rem",
              duration: 0.3,
              ease: "projectCollapse",
              stagger: 0.02
            });
          }

          if (activeIndex < projectItems.length - 1) {
            gsap.to(Array.from(projectItems).slice(activeIndex + 1), {
              marginBottom: "0.5rem",
              duration: 0.3,
              ease: "projectCollapse",
              stagger: 0.02
            });
          }
        }
      }
    };

    // Add click listeners
    projectItems.forEach((item, index) => {
      const project = projects[index];

      // Click on title to toggle project details
      const titleContainer = item.querySelector(".project-title-container");
      titleContainer?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleProject(item);
      });

      // Click on image to navigate to live site
      const imageWrapper = item.querySelector(".image-wrapper");
      imageWrapper?.addEventListener("click", (e) => {
        e.stopPropagation();
        handleProjectClick(project);
      });

      // Double click anywhere on project item to navigate to live site
      item.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        handleProjectClick(project);
      });
    });

    return () => {
      // Cleanup
      projectItems.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className="projects-component">
      {/* Projects Title */}
      <h1 className="projects-heading">
        PROJECTS
      </h1>
      <div className="projects-list" ref={projectsRef}>
        {projects.map((project, index) => (
          <div key={project.id} className="project-item" data-index={index}>
            <div className="project-title-container">
              <div className="hover-indicator left"></div>
              <h2 className="project-title">{project.title}</h2>
              <div className="hover-indicator right"></div>
            </div>
            <div className="project-content">
              <div className="project-details left">
                {project.leftLabels.map((label, labelIndex) => (
                  <p key={labelIndex} className="detail-label">{label}</p>
                ))}
              </div>
              <div className="project-image">
                <div className="image-wrapper">
                  <img src={project.image} alt={`${project.title} screenshot`} />
                  {/* Overlay with live site indicator */}
                  <div className="image-overlay">
                    <div className="live-site-indicator">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>View Live</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-details right">
                {project.rightLabels.map((label, labelIndex) => (
                  <p key={labelIndex} className="detail-label">{label}</p>
                ))}
                <p className="detail-year">/{project.year}</p>

                {/* GitHub Profile Link */}
                <div className="project-links">
                  <button
                    className="github-link"
                    onClick={(e) => handleGithubClick(e, "https://github.com/raunak6531")}
                    title="View GitHub Profile"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

