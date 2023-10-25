import { Link } from "react-router-dom";
import { profileOptions } from "../../data/models";
import Logout from "../auth/Logout";

const ProfileOptions = ({ onClick }) => {
  return (
    <div
      className={`
      absolute 
      top-[50px]
      sm:right-[-60px]
      right-[-80px]
      flex-col 
      bg-white 
      shadow-2xl 
      border
      rounded-md 
      text-[14px] 
      font-thin 
      pt-3
      w-[200px]
      text-start
      z-50
      ${onClick ? "flex" : "hidden"}
     `}
    >
      {/* Map and render profile options */}
      {profileOptions.map((option) => (
        <Link className="no-underline px-4 py-2 hover:bg-teal-100" key={option}>
          {option}
        </Link>
      ))}
      {/* Render the "Logout" component to allow users to log out */}
      <Logout />
    </div>
  );
};

export default ProfileOptions;
