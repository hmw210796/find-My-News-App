import React, { Fragment, useState } from "react";
import "./Header.css";
import Searchbar from "./Searchbar";
import Profile from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MobileNavbar from "./MobileNavbar";
const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const openNavbarHandler = () => {
    setNavbar(true);
  };

  const closeNavbarHandler = () => {
    setNavbar(false);
  };

  let navbarCSS;

  if (navbar) {
    navbarCSS = `opacity-100 z-20 `;
  } else {
    navbarCSS = `opacity-0 -z-10`;
  }

  return (
    <Fragment>
      <div
        className="flex h-full items-center justify-between bg-cover bg-no-repeat px-10 "
        style={{ backgroundImage: `url(/img/home-bg.jpg)` }}
      >
        <h1 className="text-bold text-2xl text-white">find.My.News :)</h1>
        <div className=" hidden w-3/5 gap-10 lg:flex">
          <Searchbar onClose={() => {}} />
          <Profile />
        </div>
        <button
          className="cursor-pointer text-white lg:hidden"
          onClick={openNavbarHandler}
        >
          <FontAwesomeIcon icon={faBars} className="text-3xl" />
        </button>
      </div>
      <div
        className={`${navbarCSS} navbar fixed top-0  flex w-full flex-col gap-y-6 bg-gray-700 bg-opacity-100 py-10 px-4 `}
      >
        <MobileNavbar onClose={closeNavbarHandler} />
      </div>
    </Fragment>
  );
};

export default Header;
