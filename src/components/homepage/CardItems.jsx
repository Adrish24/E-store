/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getProducts from "../../redux/api/getProducts";
import { Spinner } from "react-bootstrap";
import RandomProducts from "./RandomProducts";

const CardItems = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  // Fetch products with an empty category on component mount.
  useEffect(() => {
    dispatch(getProducts({ category: "" }));
  }, []);

  // Display a loading spinner while data is being fetched and clear it after a delay.
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
        <div className="text-black  flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex flex-col">
          <RandomProducts /> {/* Render the RandomProducts component. */}
        </div>
      )}
    </div>
  );
};

export default CardItems;
