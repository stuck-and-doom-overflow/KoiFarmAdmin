import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Layout from "./Layout"; // Import your Layout component
import Home from "./screens/Home/Home";
import FishesTable from "./screens/FishesTable/FishesTable";
import UserTable from "./screens/UserTable/UserTable";
import OrderTable from "./screens/OrderTable/OrderTable";
import FishPackage from "./screens/FishPackage/FishPackage";
import NewsTable from "./screens/NewsTable/NewsTable";

const isAuthenticated = () => {
  const isLoggedIn = localStorage.getItem("user") !== null;
  console.log("Is authenticated:", isLoggedIn); // Add this log
  return isLoggedIn;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={isAuthenticated() ? <Layout /> : <Navigate to="/login" />}
      >
        <Route path="home" element={<Home />} />
        <Route path="fishTable" element={<FishesTable />} />
        <Route path="userTable" element={<UserTable />} />
        <Route path="orderTable" element={<OrderTable />} />
        <Route path="fishPackage" element={<FishPackage />} />
        <Route path="news" element={<NewsTable />} />

      </Route>
    </Routes>
  );
}

export default App;
