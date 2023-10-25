import Categories from "./Categories";
import { categories } from "../../data/mdoels";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import getCategories from "../../redux/api/getCategories";
// import getSingleProduct from "../../redux/api/getSingleProduct";
// import getProducts from "../../redux/api/getProducts";
import { setCategory } from "../../redux/categorySlice";

const Rough = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.categories);
  const { category } = useSelector((state) => state.category);
  // const {singleProductData} = useSelector(state => state.singleProduct)

  useEffect(() => {
    dispatch(getCategories());
    // dispatch(getSingleProduct({id:'10'}))
    // dispatch(getProducts({category:''}))
  }, []);

  useEffect(() => {
    // console.log(data);
    if (data.length > 0) {
      const electronics = data.slice(0, 2);
      const beauty = data.slice(2, 4);
      const homeAndFurniture = data.slice(5, 7);
      const fashions = data.slice(7, 17);
      const wheelers = data.slice(17, 19);
      const others = data.filter(
        (item) => item === "groceries" || item === "lighting"
      );

      // console.log(fashions, electronics, beauty, homeAndFurniture, wheelers)
      dispatch(
        setCategory([
          { value: electronics },
          { value: beauty },
          { value: homeAndFurniture },
          { value: fashions },
          { value: wheelers },
          { value: others },
        ])
      );
    }
  }, [data]);

  useEffect(() => {
    console.log(category);
  }, [category]);

  // useEffect(() => {
  //   console.log(singleProductData);
  // },[singleProductData])

  // if (status === "loading") {
  //   return <div>loading...</div>;
  // }

  if (status === "failed") {
    return <div>failed...</div>;
  }


  return (
    <div className="bg-white w-full shadow-2xl">
      <div
        className="
       container
      "
      >
        <div className="list-none hidden lg:flex lg:justify-center gap-4 ">
          {categories &&
            categories.map((item, index) => (
              <Categories
                key={item}
                item={item}
                index={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Rough;
