import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);
  

  return (
    <div className="bg-light py-4">
      <div className={`${styles.section} `}>
        <div className={`${styles.heading}`}>
          <h1 className="text-5xl font-bold">Best Deals</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12 border-0">
           {
            data && data.length !== 0 &&(
              <>
               {data && data.map((i, index) => <ProductCard data={i} key={index} className="flex-grow-0 flex-shrink-0" />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
