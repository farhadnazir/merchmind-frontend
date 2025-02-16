import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import images
import workflowIcon from "../../images/prompt-icon.png";
import designIcon from "../../images/design-icon.png";
import mockupIcon from "../../images/mockup-icon.png";
import orderIcon from "../../images/order-icon.png";

const WorkflowBanner = () => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <section className="workflow-section w-full float-left padding-top padding-bottom mb-[50px]">
      {/* Wrapper */}
      <div className="wrapper2 mx-1 px-4 lg:px-8">
        {/* Title */}
        <div className="generic-title text-center mb-12 ">
          <span
            className="text-light text-lg font-medium uppercase gradientText"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            How It Works
          </span>
          <h2
            className="text-4xl font-bold text-white col-5 mx-auto"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            Get Smooth Experience With
            Our <span className="gradientText">Merchmind</span> Simplified Process
          </h2>
        </div>
      </div>

      {/* Workflow Boxes */}
      <div className="workflow-section2-box grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Image */}
        <div
          className="workflow-section2-img workflow-section2-img1 relative"
          data-aos="zoom-in"
          data-aos-duration="900"
        ></div>

        {/* Workflow Steps */}
        <div
          className="design-service grid"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <div className="workflow-box text-center p-3 rounded-lg transition-all duration-500">
            <figure className="mb-6">
              <img
                src={workflowIcon}
                alt="Give Prompt"
                className="mx-auto"
              />
            </figure>
            <h4 className="text-lg font-bold text-white">Give Prompt</h4>
            <p className="text-sm text-gray-400">
              Provide your idea or description to start the process.
            </p>
            <a href="#" className="text-[#00d9ff] text-lg transition-all duration-500">
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="workflow-box text-center p-3 rounded-lg transition-all duration-500">
            <figure className="mb-6">
              <img
                src={designIcon}
                alt="Generate Design"
                className="mx-auto"
              />
            </figure>
            <h4 className="text-lg font-bold text-white">Generate Design</h4>
            <p className="text-sm text-gray-400">
              Your prompt transforms into a custom design.
            </p>
            <a href="#" className="text-[#00d9ff] text-lg transition-all duration-500">
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="workflow-box text-center p-3 rounded-lg transition-all duration-500">
            <figure className="mb-6">
              <img
                src={mockupIcon}
                alt="Generate Mockup"
                className="mx-auto"
              />
            </figure>
            <h4 className="text-lg font-bold text-white">Generate Mockup</h4>
            <p className="text-sm text-gray-400">
              See your design applied on mockups for better visualization.
            </p>
            <a href="#" className="text-[#00d9ff] text-lg transition-all duration-500">
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="workflow-box text-center p-3 rounded-lg transition-all duration-500">
            <figure className="mb-6">
              <img
                src={orderIcon}
                alt="Order Product"
                className="mx-auto"
              />
            </figure>
            <h4 className="text-lg font-bold text-white">Order Product</h4>
            <p className="text-sm text-gray-400">
              Place an order for the custom product you love.
            </p>
            <a href="#" className="text-[#00d9ff] text-lg transition-all duration-500">
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div
          className="workflow-section2-img workflow-section2-img2 relative"
          data-aos="zoom-in"
          data-aos-duration="900"
        ></div>
      </div>
    </section>
  );
};

export default WorkflowBanner;
