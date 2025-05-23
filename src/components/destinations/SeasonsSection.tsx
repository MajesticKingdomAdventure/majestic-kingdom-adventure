import React, { useEffect, useRef } from "react";

const seasons = [
  {
    name: "Spring",
    months: "March - May",
    image: "/destination/spring-MarcusWestberg.jpg",
    description: "Experience blooming rhododendrons and clear mountain views",
    color: "from-rose-300",
  },
  {
    name: "Summer",
    months: "June - August",
    image: "/destination/summer-by-Marcus-Westberg.jpg",
    description: "Lush green landscapes with occasional monsoon showers",
    color: "from-amber-300",
  },
  {
    name: "Autumn",
    months: "September - November",
    image: "/destination/autumn-scarlette-dg.jpg",
    description: "Clear skies, pleasant temperatures and vibrant festivals",
    color: "from-orange-400",
  },
  {
    name: "Winter",
    months: "December - February",
    image: "/destination/winter-scarlette-DG.jpg",
    description: "Snow-capped mountains and traditional hot stone baths",
    color: "from-blue-400",
  },
];

const SeasonsSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe the section title
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    // Observe each card with a delay
    cardsRef.current.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          observer.observe(card);
        }, index * 150); // Staggered delay
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mb-24">
      <div
        ref={titleRef}
        className="text-center mb-12 opacity-0 transition-all duration-700"
      >
        <h2 className="h2 mb-4">
          Bhutan Through the <span className="text-majestic-gold">Seasons</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience different aspects of Bhutan's beauty throughout the year
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {seasons.map((season, index) => (
          <div
            key={season.name}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group relative h-80 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:z-10 hover:shadow-xl opacity-0"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <img
              src={season.image}
              alt={season.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${season.color} to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300`}
            ></div>

            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <h3 className="text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:-translate-y-2">
                {season.name}
              </h3>
              <p className="text-sm text-white/80 mb-1">{season.months}</p>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {season.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonsSection;
