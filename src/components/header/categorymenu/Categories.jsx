/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import getProducts from "../../../redux/api/getProducts";

// Category component for rendering a category item
const Categories = ({ string }) => {
  const dispatch = useDispatch();

  // Handle the click event for category selection.
  const handleClick = () => {
    dispatch(getProducts({ category: string }));
    sessionStorage.setItem('category', JSON.stringify(string));
    // console.log(string); // Debugging output.
  };

  return (
    <span
      onClick={handleClick}
      className={`
        flex
        flex-col
        px-4
        py-2
        w-full
        font-medium
        hover:scale-105
        duration-300 ease-in-out
        cursor-pointer
        text-[12px]
        list-none
        white-space-nowrap
      `}
    >
      <Link
        to={`/${string}`} // Create a link based on the category string.
        className="no-underline text-black normal-case"
      >
        {string} {/* Display the category string. */}
      </Link>
    </span>
  );
};

export default Categories;
