/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getCategories from "../../../redux/api/getCategories";
import { setCategory } from "../../../redux/slices/categorySlice";
import { categories } from "../../../data/models";
import { ProgressBar } from "react-bootstrap";
import CategoryList from "./CategoryList";

import { TbCategory } from "react-icons/tb";

const CategoriesBar = () => {

  // State to manage onClick effect
  const [onClick, setOnClick] = useState(false);
  const categoryMenuRef = useRef();

  const dispatch = useDispatch();

  // Fetch categories and their data from the Redux store
  const { data, status } = useSelector((state) => state.categories);

  // Use the useEffect hook to dispatch an action to get categories when the component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  // Organize categories and dispatch them when data changes
  useEffect(() => {
    const tempData = organizeCategories();
    dispatch(setCategory(tempData));
  }, [data]);

  // This function organizes sub-categories under main categories
  const organizeCategories = () => {
    if (data.length > 0) {
      const electronics = data.slice(0, 2);
      const beauty = data.slice(2, 4);
      const homeAndFurniture = data.slice(5, 7);
      const fashions = data.slice(7, 17);
      const temp = data.filter(
        (item) => item === "groceries" || item === "lighting"
      );
      const others = [...temp, ...data.slice(17, 19)];

      return [
        { value: electronics },
        { value: beauty },
        { value: homeAndFurniture },
        { value: fashions },
        { value: others },
      ];
    }
  };

   // Handle the show/hide menu on click.
   const handleShowMenu = () => {
    setOnClick((prevState) => !prevState);
  };

  // Close the menu when clicking outside of it.
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target)) {
        setOnClick(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    // Remove event listener to prevent memory leaks.
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [categoryMenuRef]);


  // Handle loading and error states
  if (status === "loading") {
    return (
      <div className="w-full hidden lg:block">
        <ProgressBar animated variant="success" now={100} />
      </div>
    );
  }

  if (status === "failed") {
    return <div>failed...</div>;
  }

  // Render the component with categories
  return (
    <div className="bg-white w-full lg:shadow-2xl">
      <div className="container">
        <div className=" lg:hidden flex p-2" onClick={handleShowMenu}>
          <div className="p-1 border border-gray-400 rounded-md mr-auto hover:bg-teal-100">
            <TbCategory className="text-[20px] text-teal-800 " />
          </div>
        </div>
        <div className={`list-none ${onClick? 'block': 'hidden'} lg:flex lg:justify-center z-50 gap-4`}>
          {categories &&
            categories.map((item, index) => (
              <CategoryList key={item} item={item} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
