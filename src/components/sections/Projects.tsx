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
    image: "https://cdn.cosmos.so/2519c3a3-40c4-49ff-95ed-928b3cf69740?format=jpeg",
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
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: "https://cdn.cosmos.so/17b5c6b8-91c7-420b-8b98-29ec22b1afbb?format=jpeg",
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
    projectItems.forEach((item) => {
      item.addEventListener("click", () => {
        toggleProject(item);
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
                  <img src={project.image} alt={`${project.title} image`} />
                </div>
              </div>
              <div className="project-details right">
                {project.rightLabels.map((label, labelIndex) => (
                  <p key={labelIndex} className="detail-label">{label}</p>
                ))}
                <p className="detail-year">/{project.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

