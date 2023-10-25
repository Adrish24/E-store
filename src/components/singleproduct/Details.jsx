/* eslint-disable react/prop-types */
import { AiFillStar } from "react-icons/ai";

const Details = ({ data }) => {
  return (
    <div className="px-2 ml-auto mb-4">
      <div className="border-2 border-gray-300 rounded-md p-3 mb-3">
        <h5 className="font-semibold mb-3">{data.title}</h5>
        <p className="flex items-center">
          <span
            className="
            flex
            justify-center
            items-center
            bg-green-400 
            text-white
            py-1 px-2 
            rounded-xl 
            font-semibold 
            mr-2 "
          >
            <span>{data.rating.toFixed(1)}</span>
            <AiFillStar size={12} style={{ marginLeft: 4 }} />
          </span>
          <span className="grow text-gray-500">100 reviews</span>
        </p>
        <p className="m-0">
          <span className="text-red-600 text-[20px] mr-2">
            {data.discountPercentage.toFixed(0)}%
          </span>
          <span className="text-[20px] font-semibold">₹ {data.price}</span>
        </p>
        <span className="font-semibold text-green-600">{`In stock (${data.stock})`}</span>
      </div>
      <div className="flex border-2 border-gray-300 rounded-md p-3">
        <div className="flex flex-col mr-4 h-full">
          <span className="text-gray-400 font-medium text-[14px] mb-2">Brand</span>
          <span className="text-gray-400 font-medium text-[14px]">
            Description
          </span>
        </div>
        <div className="flex flex-col h-full">
          <span className="font-medium text-[14px] mb-2">
            {data.brand}
          </span>
          <p className="flex-1 font-medium text-[14px] m-0 ">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
