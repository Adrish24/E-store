// importing search-icon
import { BiSearchAlt } from "react-icons/bi";

const SearchBar = () => {
  return (
    <div
      className="
    flex
    bg-gray-300 
    rounded-md
    h-[40px]
    w-full
    sm:w-[300px]
    md:w-[500px]
    lg:w-[600px]
    xl:w-[800px]
    mr-auto
    "
    >
      <input
        className="
      grow
      bg-transparent
      rounded-md
      outline-none
      border-none
      p-2
      text-[15px] placeholder:text-[15px]
      w-full
      "
        type="text"
        placeholder="Search your products..."
      />
      <button
        className="
      flex 
      justify-center 
      items-center
      w-[40px]
      h-auto
      p-2
      rounded-r-md
      hover:bg-slate-700
      hover:text-white
      text-[15px]
      sm:text-[25px]
      hover:scale-110
      duration-300 ease-in-out
      "
      >
        <BiSearchAlt />
      </button>
    </div>
  );
};

export default SearchBar;
