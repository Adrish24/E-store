import { useSelector } from "react-redux";
import Item from "./Item";

// import { useEffect } from "react";

const RandomProducts = () => {
  const { productsData } = useSelector((state) => state.products);

  // Log the productsData for debugging purposes whenever it changes.
  // useEffect(() => {
  //     console.log(productsData);
  // }, [productsData]);
  

  // Create a shuffled copy of productsData.
  let newArray = [...productsData];
  for (let i = 0; i < newArray.length - 1; i++) {
    let j = Math.floor(Math.random() * (i+1));
    let temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return (
    <>
      {newArray &&
        newArray
          .map((product) => <Item key={product.id} product={product} />)
          .slice(0, 20)}{" "}
      {/* Display a maximum of 20 shuffled products. */}
    </>
  );
};

export default RandomProducts;
