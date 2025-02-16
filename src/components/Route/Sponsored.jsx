import React, { useEffect } from "react";

const Sponsored = () => {
  useEffect(() => {
    const ul = document.querySelector(".logos");
    // Duplicate the list dynamically
    ul.insertAdjacentHTML("afterend", ul.outerHTML);
    ul.nextSibling.setAttribute("aria-hidden", "true");
  }, []);

  const logoImages = [
    "/images/service-sponser1.png",
    "/images/service-sponser2.png",
    "/images/service-sponser3.png",
    "/images/service-sponser4.png",
    "/images/service-sponser5.png",
    "/images/service-sponser6.png",
    "/images/service-sponser7.png",
  ];

  return (
    <div
      className="w-full inline-flex h-[150px] flex-nowrap bg-black overflow-hidden">
      <ul
        className="logos flex items-center justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
      >
        {logoImages.map((image, index) => (
          <li key={index}>
            <img
              src={image}
              alt={`logo-${index}`}
              className="h-10 w-auto object-contain"
            />
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sponsored;
