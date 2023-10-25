import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

// header components
import MenuItems from "../components/header/MenuItems";
import SearchBar from "../components/header/SearchBar";
import CategoriesBar from "../components/header/categorymenu/CategoriesBar";


const Header = () => {
  return (
    // Navigation bar
    <Navbar
      className="
     flex
     flex-col
    bg-teal-400 
    fixed-top z-10 
    pb-0
    "
    >
      <div
        className="
      container-xxl 
      container-fluid 
      flex 
      flex-wrap 
      justify-center
      items-center 
      mx-sm-3 mx-md-4 
      mx-xxl-auto 
      "
      >
        {/* Page Logo */}
        <div className="grow">
          <Link
            to={"/"}
            className="
          text-[20px] 
          sm:text-[30px] 
          no-underline 
          py-2 pr-4 
          mr-4
          font-bold 
          text-teal-800
          antialiased
          "
          >
            E.store
          </Link>
        </div>

        {/* searchbar component */}
        <div className="grow order-3 m-2">
          <SearchBar />
        </div>

        {/* MenuItems component */}
        <div
          className="
        flex
        sm:order-last
        text-black
        mx-auto
        cursor-pointer
        "
        >
            <MenuItems />
        </div>
      </div>
      
      {/* category bar to filter out products based of selected category */}
      <CategoriesBar />
    </Navbar>
  );
};

export default Header;
