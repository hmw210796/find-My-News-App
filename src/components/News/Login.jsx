import {
  Alert,
  Button,
  TextField,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import UserContext from "../../store/user-context";
import NewsContext from "../../store/news-context";

const Login = () => {
  const userCtx = useContext(UserContext);
  const newsCtx = useContext(NewsContext);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const emailOnChangeHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const passwordOnChangeHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  let url;
  if (isLogin) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGnv552yn-OlS7YUIDaGkqRWR7anIEtpM";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGnv552yn-OlS7YUIDaGkqRWR7anIEtpM";
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        returnSecureToken: true,
        displayName: "Ming",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setIsLoading(false);
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        userCtx.onLogin({
          localId: data.localId,
          idToken: data.idToken,
          email: data.email,
        });
        setIsLoading(false);
        newsCtx.userIdChange(data.localId);
      })
      .catch((err) => setError(err));
  };

  const toggleAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <form
      className="mx-auto  rounded-md bg-gray-400 bg-opacity-80 p-10"
      onSubmit={submitHandler}
    >
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">
          {isLogin ? "Sign In" : "Create Account"}
        </h1>
        <TextField
          onChange={emailOnChangeHandler}
          type="text"
          placeholder="Email*"
          required
        />
        <TextField
          onChange={passwordOnChangeHandler}
          type="password"
          placeholder="Password*"
          required
        />
        {isLoading && <CircularProgress className="mx-auto" />}

        {!isLoading && (
          <Button variant="contained" onClick={submitHandler}>
            {isLogin ? "Login" : "Create Account"}
          </Button>
        )}
        {!isLoading && (
          <Button variant="contained" onClick={toggleAuthHandler}>
            {isLogin ? "Sign Up New Account" : "Login with Existing Account"}
          </Button>
        )}
        <Snackbar
          autoHideDuration={2000}
          open={error ? true : false}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error && error.message && error.message.split("_").join(" ")}
          </Alert>
        </Snackbar>
      </div>
    </form>
  );
};

export default Login;
