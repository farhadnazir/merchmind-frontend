import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section
      className={`relative w-full bg-light-black`}
      style={{
        minHeight: '90vh',
        backgroundImage: "url('/index2-banner-img.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Wrapper */}
      <div
        className={`
          ${styles.section} 
          w-full  
          md:w-[90%] 
          lg:w-[85%] 
          px-4 md:px-0 
          flex flex-col 
          justify-center 
          items-center md:items-center
          min-h-[70vh]
        `}
      >
        <div className="animatedBackground">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index}></span>
          ))}
        </div>
        {/* Left Section */}
        <div className="banner-left-sec text-center md:text-left">
          <h1
            className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            The <span className="gradientText">Future</span> in <br />
            Custom Printing Service
          </h1>
          <p
            className="text-white mt-4 text-lg md:text-xl"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Where Imagination Meets Innovation in Custom Printing.
          </p>
          <div
            className="generic-btn mt-6 flex gap-4 justify-content-center"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <Link
              to="/products"
              className="hover:no-underline gradientBg text-white px-6 py-3 rounded-full text-lg"
            >
              Start Shopping
            </Link>
            <Link
              to={isAuthenticated ? "/generate-your-own" : "/login"}
              className="hover:no-underline gradientBg text-white px-6 py-3 rounded-full text-lg"
            >
              Generate Designs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
