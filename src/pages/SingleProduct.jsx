import { useEffect } from "react";
import ProductItem from "../components/singleproduct/ProductItem";



const SingleProduct = () => {
  

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="w-full bg-white">
      <div
        className="
    container-fluid 
    container-xxl 
    w-full
    py-8
    "
      >
        {/* Render the ProductItem component to display a single product */}
        <ProductItem />
      </div>
    </div>
  );
};

export default SingleProduct;
