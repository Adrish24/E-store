import { Link } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import ProfileOptions from "./ProfileOptions";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContex";

const Profile = () => {
  // Retrieve user data from the authentication context.
  const { userData } = useAuth();

  // State to manage the onClick effect and the profile menu reference.
  const [onClick, setOnClick] = useState(false);
  const profMenuRef = useRef();

  // Handle the show/hide profile menu on click.
  const handleShowMenu = () => {
    setOnClick((prevState) => !prevState);
  };

  // Close the menu when clicking outside of it.
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profMenuRef.current && !profMenuRef.current.contains(e.target)) {
        setOnClick(false);
      }
    };

    // Add an event listener to handle clicks outside of the menu.
    window.addEventListener('click', handleOutsideClick);

    // Remove the event listener to prevent memory leaks.
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [profMenuRef]);
  
  return (
    <>
      {userData && userData ? (
        <button
          ref={profMenuRef}
          className="
            relative
            text-[15px] 
            sm:text-[20px]
            rounded-md 
            hover:bg-teal-300
            hover:scale-110
            duration-300 ease-in-out
            font-medium 
            mb-2
          "
          onClick={handleShowMenu}
        >
          <Link className="flex items-center no-underline py-2 px-3 hover:text-white">
            <CgProfile className="mr-1 text-[20px]" />
            <span>{userData.displayName}</span>
          </Link>
          {/* Render profile options when onClick is true */}
          <ProfileOptions onClick={onClick} />
        </button>
      ) : (
        <button
          className="
            text-[15px] 
            sm:text-[20px]
            rounded-md 
            hover:bg-teal-300
            hover:text-white
            hover:scale-110
            duration-300 ease-in-out
            font-medium 
            mb-2
          "
        >
          <Link to={"/auth"} className="flex items-center no-underline py-2 px-3">
            <CgProfile className="mr-1 text-[20px]" />
            <span>Profile</span>
          </Link>
        </button>
      )}
    </>
  );
};

export default Profile;
