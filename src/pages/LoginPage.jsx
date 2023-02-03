import React from "react";
import Login from "../components/News/Login";

const LoginPage = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center space-y-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/img/home-bg.jpg)` }}
    >
      <h1 className="text-6xl text-white">find My News :)</h1>
      <Login />
    </div>
  );
};

export default LoginPage;
