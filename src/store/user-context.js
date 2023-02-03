import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsContext from "./news-context";

const UserContext = React.createContext({
  isLoggedIn: "",
  email: "",
  onLogin: () => {},
  onLogout: () => {},
  onChangeUserInput: () => {},
});

export const UserContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  const newsCtx = useContext(NewsContext);

  const navigate = useNavigate();

  const loginHandler = (tokens) => {
    if (!tokens.localId || !tokens.idToken) {
      return;
    }

    localStorage.setItem("email", tokens.email);
    localStorage.setItem("token", tokens.idToken);
    localStorage.setItem("userId", tokens.localId);
    newsCtx.userIdChange(tokens.localId);

    setToken(tokens.idToken);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    // setUserId("");

    localStorage.removeItem("favoriteNews");

    navigate("/home");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
