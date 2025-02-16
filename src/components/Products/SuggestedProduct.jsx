import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const filteredData =
      allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(filteredData);
  }, [allProducts, data.category]);

  return (
    <div>
      {data ? (
        <div className=" container-fluid py-5">
          <h2 className="text-[25px] font-[500] border-b mb-4">Related Products</h2>
          <div className="flex flex-wrap justify-start gap-1">
            {productData &&
              productData.map((item, index) => (
                <div key={index} className="flex-grow-0 flex-shrink-0">
                  <ProductCard data={item} />
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
