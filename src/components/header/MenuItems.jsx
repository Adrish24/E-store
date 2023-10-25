// The MenuItems component handles the rendering of the Login and Cart buttons in the navigation menu.

import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cartcount from "../cart/Cartcount";
import { useSelector } from "react-redux";
import Profile from "./Profile";


const MenuItems = () => {
  // Retrieve the cart item count from the Redux store.
  const { count } = useSelector((state) => state.cartCount);

  return (
    <div className="flex">
      <Profile /> {/* Render the user profile component */}
      <button
        className="
          relative
          mb-2
          font-medium
          text-[15px]
          sm:text-[20px]
          rounded-md
          hover:bg-teal-300
          hover:text-white
          hover:scale-110
          duration-300 ease-in-out
        "
      >
        <Link to={"/cart"} className="flex items-center no-underline py-2 px-3">
          <AiOutlineShoppingCart className="mr-1 text-[20px]" />
          <span>Cart</span>
          {/* Render the cart count component when items are in the cart */}
          {count > 0 ? <Cartcount count={count} /> : null}
        </Link>
      </button>
    </div>
  );
};

export default MenuItems;
