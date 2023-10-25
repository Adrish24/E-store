/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Categories from "./Categories";

// Categories component for rendering category items with subcategories
const CategoryList = ({ item, index }) => {
  // State to manage onClick effect
  const [onClick, setOnClick] = useState(false);
  const menuRef = useRef();

  // Retrieve the selected category from the Redux state.
  const { category } = useSelector((state) => state.category);

  // Handle the show/hide menu on click.
  const handleShowMenu = () => {
    setOnClick((prevState) => !prevState);
  };

  // Close the menu when clicking outside of it.
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOnClick(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    // Remove event listener to prevent memory leaks.
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [menuRef]);

  return (
    <li
      className={`
          relative
          list-none
          flex 
          flex-col
          lg:flex-row
          items-center 
          lg:py-3
          lg:px-4
          py-2
          font-semibold
          text-[15px] 
          lg:hover:border-b-4
          lg:hover:border-emerald-900 
          lg:hover:scale-110
          duration-300 ease-in-out
          cursor-pointer
          `}
      key={item}
      onClick={handleShowMenu}
      ref={menuRef}
    >
      <div className="flex">
        <Link
          className="
          no-underline
          text-gray-600
          hover:text-teal-900
          "
        >
          {item}
        </Link>

        <RiArrowDropDownLine
          className={`text-[20px] ${
            onClick ? "rotate-180 duration-300" : "duration-300"
          }`}
        />
      </div>

      {/* Subcategory menu */}
      <div
        className={`
          z-[100]
          absolute
          top-[0px]
          right-0
          shadow-2xl
          border
          py-2
          bg-white
          rounded-md
          w-[200px]
          ${onClick ? "block" : "hidden"}
        `}
      >
        {category?.[index]?.value?.map((string) => (
          <Categories key={string} string={string} />
        ))}
      </div>
    </li>
  );
};

export default CategoryList;
