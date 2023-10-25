import { useState } from "react";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";

const Auth = () => {
  // State to toggle between login and sign-up forms
  const [toggle, setToggle] = useState(true);

  // Function to handle the toggle between login and sign-up
  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div className="">
      <div className="container-fluid flex justify-center items-center py-12">
        {toggle ? (
          // Render the Login component when toggle is true
          <Login handleToggle={handleToggle} />
        ) : (
          // Render the SignUp component when toggle is false
          <SignUp handleToggle={handleToggle} />
        )}
      </div>
    </div>
  );
};

export default Auth;
