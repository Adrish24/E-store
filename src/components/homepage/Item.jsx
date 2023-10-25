/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

// Import an image placeholder
import image_placeholder from "../../assets/image_placeholder.png";

const Item = ({ product }) => {
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


  // Function to set the selected product in sessionStorage
  const onClick = () => {
    sessionStorage.setItem("productId", JSON.stringify(product.id));
  };

  // Function to handle image loading error by displaying a placeholder
  const handleImageError = (e) => {
    e.target.src = image_placeholder;
  };

  
  return (
    <Link
      to={`/${product.title}/${product.id}`}
      className="sm:pr-5 mb-[20px] bg-white no-underline"
      onClick={onClick}
    >
      <Card
        className="p-2 h-100 hover:scale-105 duration-300 ease-in-out"
      >
        {loading ? (
          // Display a loading spinner while waiting for the image to load
          <div className="flex items-center justify-center w-full h-[200px] sm:h-[250px]">
            <Spinner />
          </div>
        ) : (
          // Once the image is loaded, render the product image
          <Card.Img
            onError={handleImageError}
            className="w-full h-[200px] sm:h-[250px]"
            src={product.thumbnail}
            loading="lazy"
          />
        )}
        <Card.Body>
          <Card.Title className="whitespace-nowrap overflow-hidden text-ellipsis">
            {product.title}
          </Card.Title>
          <Card.Text>
            <span className="text-red-600 text-[20px] mr-2">
              {product.discountPercentage.toFixed(0)}%
            </span>
            <span className="text-[20px] font-semibold">₹ {product.price}</span>
          </Card.Text>
          <Card.Text className="flex items-center">
            <span
              className="
            flex
            justify-center
            items-center
            bg-green-400 
            text-white
            py-1 px-2 
            rounded-xl 
            font-semibold 
            mr-2"
            >
              <span>{product.rating.toFixed(1)}</span>
              <AiFillStar size={12} style={{ marginLeft: 4 }} />
            </span>
            <span className="grow">100 reviews</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Item;
