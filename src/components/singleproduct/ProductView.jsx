
import { useSelector } from "react-redux";
import Details from "./Details";
import Preview from "./Preview";
import { Spinner } from "react-bootstrap";

const ProductView = () => {
  // Retrieve single product data and product ID from Redux state.
  const { singleProductData, status } = useSelector(
    (state) => state.singleProduct
  );

  // Log single product data for debugging purposes.
//   useEffect(() => {
//     console.log(singleProductData);
//   }, [singleProductData]);

  if (status === "loading") {
    return <div><Spinner/></div>;
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:h-screen lg:mx-[100px]">
      <Preview data={singleProductData}/>
      <Details data={singleProductData}/>
    </div>
  );
};

export default ProductView;
