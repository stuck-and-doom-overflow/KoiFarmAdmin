import React from "react";
import "./login.scss";
import logo from "../../assets/img/logo.png";
import { loginUser } from "../../../redux/thunks/UserThunk";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
    };
    try {
      const result = await dispatch(loginUser(userCredentials));
      if (loginUser.fulfilled.match(result)) {
        setEmail("");
        setPassword("");
        Swal.fire({
          icon: "success",
          text: "Login Successfully!",
        });
        navigate("/home");

      } else {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Try again later",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login__main">
      <section
        class="bg-gray-50 dark:bg-gray-900"
        style={{
          borderRadius: "10px",
          boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
          width: "30%",
        }}
      >
        <div class="w-full bg-white rounded-lg shadow ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <img
              class="w-12 h-12 mr-2"
              src={logo}
              alt="logo"
              style={{ margin: "0 auto" }}
            />
            <h1
              class="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl "
              style={{ textAlign: "center" }}
            >
              Welcome back!
            </h1>
            <h4 style={{ textAlign: "center" }}>Please login to continue!</h4>
            <form
              class="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleLogin}
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium "
                  style={{ color: "grey" }}
                >
                  Your email
                </label>
                <input
                  type="email"
                  // name="email"
                  // id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  style={{
                    background: "#EEEEEE",
                    color: "black",
                    border: "0.5px solid #e5e7eb",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium "
                  style={{ color: "grey" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  // name="password"
                  // id="password"
                  class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  style={{
                    background: "#EEEEEE",
                    color: "black",
                    border: "0.5px solid #e5e7eb",
                  }}
                  value={password}
                  placeholder="*******"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                style={{
                  position: "absolute",
                  borderRadius: 20,
                  width: 200,
                  left: "43%",
                  marginBottom: "20px",
                }}
                type="submit"
                onP
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Signin
              </button>
              <p
                class="text-sm font-light text-gray-500 dark:text-gray-400"
                style={{
                  marginTop: "90px",
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                Don't have account yet?
                <a
                  style={{ textDecoration: "underline" }}
                  href="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Signup here
                </a>
              </p>
            </form>
          </div>
        </div>
        {/* </div> */}
      </section>
    </div>
  );
}
