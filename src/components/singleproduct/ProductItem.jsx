/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getSingleProduct from "../../redux/api/getSingleProduct";
import { Spinner } from "react-bootstrap";
import { setSingleProductId } from "../../redux/slices/pageRefreshSlice";
import ProductView from "./ProductView";

const ProductItem = () => {
  const dispatch = useDispatch();

  // Retrieve single product data and product ID from Redux state.
  const { singleProductId } = useSelector((state) => state.refresher);

  const [loading, setLoading] = useState(true);

  // Initialize product ID from sessionStorage on component mount.
  useEffect(() => {
    const productId = JSON.parse(sessionStorage.getItem("productId"));
    dispatch(setSingleProductId(productId));
  }, []);

  // Fetch single product data when the product ID changes.
  useEffect(() => {
    if (!singleProductId) return; // Ensure a valid product ID is available.

    dispatch(getSingleProduct({ id: singleProductId }));
    dispatch(setSingleProductId("")); // Clear the product ID after fetching data.
  }, [singleProductId]);

  // Display a loading spinner while data is being fetched.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clean up the timer to prevent memory leaks.
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <div className="w-full">
      {loading ? (
        <div className="h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <ProductView/>
      )}
    </div>
  );
};

export default ProductItem;
