import React, { useEffect } from "react";
import $ from "jquery";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS animations

const Slider1 = () => {
  useEffect(() => {

    // Custom Infinite Scrolling Logic
    $(document).ready(function () {
      const slider = $("#owlsliderone");
      const items = slider.find(".item");
      const itemWidth = 200; // Width of each item
      const visibleItems = 5; // Number of visible items
      const totalItems = items.length;

      // Clone first and last few items for seamless looping
      const cloneFirstItems = items.slice(0, visibleItems).clone();
      const cloneLastItems = items.slice(-visibleItems).clone();
      slider.append(cloneFirstItems);
      slider.prepend(cloneLastItems);

      // Update total items to include clones
      const newTotalItems = slider.find(".item").length;

      // Set slider width dynamically
      slider.css("width", itemWidth * newTotalItems + "px");

      // Initialize current position
      let currentIndex = visibleItems;

      // Set initial translateX to show the first item
      slider.css({
        transform: `translateX(-${currentIndex * itemWidth}px)`,
        transition: "none",
      });

      const moveSlider = (direction) => {
        if (direction === "next") {
          currentIndex++;
          slider.css({
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: "transform  0.5s ease",
          });

          if (currentIndex === totalItems + visibleItems) {
            setTimeout(() => {
              slider.css({
                transform: `translateX(-${visibleItems * itemWidth}px)`,
                transition: "none",
              });
              currentIndex = visibleItems;
            }, 500); // Wait for the transition to finish
          }
        } else {
          currentIndex--;
          slider.css({
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: "transform 0.5s ease",
          });

          if (currentIndex === visibleItems - 1) {
            setTimeout(() => {
              slider.css({
                transform: `translateX(-${
                  (totalItems + visibleItems - 1) * itemWidth
                }px)`,
                transition: "none",
              });
              currentIndex = totalItems + visibleItems - 1;
            }, 500); // Wait for the transition to finish
          }
        }

        // Reinitialize AOS animations after slider movement
        setTimeout(() => {
          AOS.refreshHard();
        }, 500);
      };

      // Next and Previous buttons
      $("#next").on("click", () => moveSlider("next"));
      $("#prev").on("click", () => moveSlider("prev"));

      // Trigger AOS refresh after initial DOM updates
      AOS.refreshHard();
    });
  }, []);

  const sliderImages = [
    "images/slider-img1.png",
    "images/design-img1.jpg",
    "images/design-img2.jpg",
    "images/slider-img2.png",
    "images/slider-img3.png",
    "images/slider-img4.png",
    "images/slider-img5.png",
    "images/vedio-img.jpg",
  ];

  return (
    <div className="slider-container w-100 bg-black padding-bottom pb-5">
      <div className="slider-wrapper">
        {/* Slider Items */}
        <div
          id="owlsliderone"
          className="slider-items"
      
        >
          {sliderImages.map((image, index) => (
            <div className="item" key={index}>
              <figure className="mb-0">
                <img
                  src={image}
                  alt={`slider-${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              </figure>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button id="prev" className="slider-btn">❮</button>
        <button id="next" className="slider-btn">❯</button>
      </div>
    </div>
  );
};

export default Slider1;
