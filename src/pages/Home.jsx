import { useEffect } from "react";
import CardItems from "../components/homepage/CardItems";


const Home = () => {
 

  // Scroll to the top of the page and log a message when the component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

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
        {/* Render the CardItems component */}
        <CardItems />
      </div>
    </div>
  );
};

export default Home;
