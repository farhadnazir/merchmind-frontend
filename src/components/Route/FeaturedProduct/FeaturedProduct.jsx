import React from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12 border-0 ">
          {allProducts && allProducts.length !== 0 && (
            <>
              {allProducts.map((product, index) => (
                <div key={index} className="flex-grow-0 flex-shrink-0">
                  <ProductCard data={product} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
