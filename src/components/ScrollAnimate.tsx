import { ReactNode } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type ScrollAnimateProps = {
  children: ReactNode;
  animation?: "fadeIn" | "fadeInLeft" | "fadeInRight" | "fadeInUp" | "fadeInDown";
  threshold?: number;
  delay?: number;
  className?: string;
};

export const ScrollAnimate = ({
  children,
  animation = "fadeIn",
  threshold = 0.1,
  delay = 0,
  className = "",
}: ScrollAnimateProps) => {
  const { ref, className: animateClassName } = useScrollAnimation(
    animation,
    threshold,
    delay
  );

  return (
    <div ref={ref} className={`${animateClassName} ${className}`}>
      {children}
    </div>
  );
};

