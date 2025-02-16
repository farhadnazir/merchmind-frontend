import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import AOS from "aos";
import "aos/dist/aos.css";

const Categories = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({ duration: 600, once: false });
  }, []);

  return (
    <div className="bg-black">
      {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding flex justify-between w-full shadow-lg transparent-blurred-bg k p-5  rounded-lg`}
          data-aos="fade-up" // AOS fade-up animation
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-center" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-[white] text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs text-[white] md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Categories Section */}
      <div
        className={`${styles.section} p-6 rounded-lg  mt-12`}
        id="categories"
      >
        <div className="grid  grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (category) => {
                navigate(`/products?category=${category.title}`);
              };
              return (
                <div
                  className="w-[full] h-[100px] transparent-blurred-bg flex items-center justify-start gap-3 cursor-pointer overflow-hidden shadow-sm rounded-[10px]"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                  data-aos="fade-up" // AOS fade-up animation
                >
                  <img
                    src={i.image_Url}
                    className="w-[90px] pl-2 object-cover rounded-circle"
                    alt={i.title}
                  />
                  <h5 className="text-[18px]  text-white ">{i.title}</h5>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
