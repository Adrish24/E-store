// This component is responsible keeping track of products visiblely
// MenuItem component is using this component


const Cartcount = ({ count }) => {

  return (
    <div
      className="
    absolute
    flex
    items-center
    justify-center
    top-1
    right-12
    sm:right-[60px]
    sm:top-2
    bg-red-500
    text-[10px]
    w-4
    h-4
    rounded-full
    "
    >
      {count}
    </div>
  );
};

export default Cartcount;
