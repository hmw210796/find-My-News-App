import UserContext from "../../store/user-context";
import { Avatar, Button, Chip } from "@mui/material";
import { useContext } from "react";
import React from "react";

const Profile = () => {
  const userCtx = useContext(UserContext);

  const logoutHandler = () => {
    userCtx.onLogout();
  };

  const userEmail = localStorage.getItem("email");

  return (
    <div className=" flex items-center space-x-4">
      <Chip
        variant="contained"
        label={userEmail}
        color="primary"
        avatar={<Avatar>{userEmail.split("")[0]}</Avatar>}
        size="small"
      />
      <Button variant="contained" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
