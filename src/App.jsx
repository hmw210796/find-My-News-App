import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserContext from "./store/user-context";

function App() {
  const userCtx = useContext(UserContext);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={userCtx.token ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={userCtx.token ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
