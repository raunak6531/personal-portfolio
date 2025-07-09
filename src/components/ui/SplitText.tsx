import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  triggerOnMount?: boolean; // New prop to trigger animation immediately
  animationDelay?: number; // Delay before starting animation
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  triggerOnMount = false,
  animationDelay = 0,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animationCompletedRef.current) return;

    // Simple text splitting without GSAP SplitText plugin
    const splitTextIntoSpans = (element: HTMLElement, type: string) => {
      const text = element.textContent || "";
      element.innerHTML = "";

      if (type === "chars") {
        return text.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char; // Non-breaking space
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          element.appendChild(span);
          return span;
        });
      } else if (type === "words") {
        return text.split(" ").map((word, index) => {
          const span = document.createElement("span");
          span.textContent = word;
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          element.appendChild(span);
          if (index < text.split(" ").length - 1) {
            element.appendChild(document.createTextNode(" "));
          }
          return span;
        });
      }
      return [];
    };

    const targets = splitTextIntoSpans(el, splitType);

    const tl = gsap.timeline({
      delay: animationDelay,
      smoothChildTiming: true,
      onComplete: () => {
        animationCompletedRef.current = true;
        gsap.set(targets, {
          ...to,
          clearProps: "willChange",
          immediateRender: true,
        });
        onLetterAnimationComplete?.();
      },
    });

    // If triggerOnMount is true, start animation immediately
    // Otherwise, use ScrollTrigger
    if (triggerOnMount) {
      // Show the container and hide individual elements
      gsap.set(el, { opacity: 1 });
      gsap.set(targets, { ...from, immediateRender: true, force3D: true });

      tl.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        force3D: true,
      });
    } else {
      const startPct = (1 - threshold) * 100;
      const m = /^(-?\d+)px$/.exec(rootMargin);
      const raw = m ? parseInt(m[1], 10) : 0;
      const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`;
      const start = `top ${startPct}%${sign}`;

      ScrollTrigger.create({
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
        onEnter: () => {
          // Show the container and hide individual elements
          gsap.set(el, { opacity: 1 });
          gsap.set(targets, { ...from, immediateRender: true, force3D: true });
          gsap.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            force3D: true,
          });
        },
      });
    }



    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(targets);
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
        opacity: 0, // Hide initially
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
