import { useEffect, useRef, useState } from "react";

type AnimationType = "fadeIn" | "fadeInLeft" | "fadeInRight" | "fadeInUp" | "fadeInDown";

export const useScrollAnimation = (
  animationType: AnimationType = "fadeIn",
  threshold: number = 0.1,
  delay: number = 0
) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.disconnect();
      }
    };
  }, [threshold, delay]);

  return {
    ref: elementRef,
    className: `scroll-animate scroll-animate--${animationType}${isVisible ? " scroll-animate--visible" : ""}`,
  };
};

