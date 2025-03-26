import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const animationTriggered = useRef(false);

  // Reset and trigger animation on mount and route changes
  useEffect(() => {
    // Reset animation state initially
    setIsVisible(false);
    animationTriggered.current = false;

    // Trigger animation after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      animationTriggered.current = true;
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [location.key]);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const scrollY = window.scrollY;
      const opacity = 1 - Math.min(1, scrollY / 700);
      const translateY = scrollY * 0.4;

      // Apply parallax effect to the background
      heroRef.current.style.backgroundPositionY = `${translateY}px`;

      // Apply fade effect to the content
      const content = heroRef.current.querySelector(
        ".hero-content"
      ) as HTMLElement;
      if (content) {
        content.style.opacity = String(opacity);
        content.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToDestinations = () => {
    const destinationsSection = document.getElementById("destinations");
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={heroRef}
      className="h-screen relative bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url(/hero-img.jpg)",
      }}
      id="home"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white/30"></div>

      <div className="hero-content container mx-auto px-4 text-center text-white z-10 transition-all duration-500">
        <div
          className={
            isVisible ? "animate-slide-in-top" : "opacity-0 translate-y-[-50px]"
          }
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-shadow-lg">
            Discover <span className="text-majestic-gold">Bhutan's</span>{" "}
            Majestic Wonders
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-shadow">
            Your Gateway to Bhutan's Hidden Wonders - Experience the rich
            culture, spiritual heritage, and breathtaking landscapes
          </p>

          <div className="flex justify-center">
            <a
              href="#destinations"
              className="bg-majestic-gold hover:bg-majestic-amber text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Explore Tours
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToDestinations}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-10"
        aria-label="Scroll down"
      >
        <ChevronDown size={36} className="stroke-white" />
      </button>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
