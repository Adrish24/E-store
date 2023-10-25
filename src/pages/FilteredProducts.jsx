import { useEffect } from "react";
import FilteredItems from "../components/filteredproducts/FilteredItems";


const FilteredProducts = () => {
  

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  },[])
  
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
        {/* Render the FilteredItems component for displaying filtered products. */}
        <FilteredItems />
      </div>
    </div>
  );
};

export default FilteredProducts;
