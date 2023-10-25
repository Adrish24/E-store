import { Spinner } from "react-bootstrap";
import CartItems from "../components/cart/CartItems";
import { useEffect, useState } from "react";

const Cart = () => {
  // State to manage the loading state
  const [loading, setLoading] = useState(true);

  // Use the useEffect hook to simulate data loading with a timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clean up the timer to prevent memory leaks
    return () => clearTimeout(timer);
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
        {loading ? (
          // Display a loading spinner while data is being fetched
          <div className="h-screen flex justify-center">
            <Spinner />
          </div>
        ) : (
          // Once data is loaded, render the CartItems component
          <CartItems />
        )}
      </div>
    </div>
  );
};

export default Cart;
