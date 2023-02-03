import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import Profile from "./Profile";
import Searchbar from "./Searchbar";
import { faX } from "@fortawesome/free-solid-svg-icons";

const MobileNavbar = (props) => {
  const closeNavbarHandler = () => {
    props.onClose(false);
  };

  return (
    <Fragment>
      <div className="mr-6 flex items-center justify-end space-x-10">
        <Profile />
        <FontAwesomeIcon
          icon={faX}
          className=" text-2xl text-white"
          onClick={closeNavbarHandler}
        />
      </div>
      <Searchbar onClose={closeNavbarHandler} />
    </Fragment>
  );
};

export default MobileNavbar;
