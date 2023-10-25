/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getProducts from "../../redux/api/getProducts";
import Item from "../homepage/Item";
import { Spinner } from "react-bootstrap";
import { setProductCategory } from "../../redux/slices/pageRefreshSlice";

const FilteredItems = () => {
  const dispatch = useDispatch();

  // Retrieve products data and product category from Redux state.
  const { productsData } = useSelector((state) => state.products);
  const { productCategory } = useSelector((state) => state.refresher);

  const [loading, setLoading] = useState(true);

  // Initialize product category from sessionStorage on component mount.
  useEffect(() => {
    const category = JSON.parse(sessionStorage.getItem("category"));
    dispatch(setProductCategory(category));
  }, []);

  // Fetch products when the product category changes.
  useEffect(() => {
    if (!productCategory) return; // Ensure a valid product category is available.
    // console.log(productCategory); // Debugging output.
    dispatch(getProducts({ category: productCategory }));
    dispatch(setProductCategory('')); // Clear the product category after fetching data.
  }, [productCategory]);

  // Display a loading spinner while data is being fetched.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clean up the timer to prevent memory leaks.
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full px-4">
      {loading ? (
        <div className="text-black h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsData &&
            productsData.map((product) => (
              <Item key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default FilteredItems;
