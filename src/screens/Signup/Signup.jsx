import React from "react";
import "../Login/login.scss";
import logo from "../../assets/img/logo.png";
import { registerUser } from "../../../redux/thunks/UserThunk";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Signup() {
  const { registrationLoading, registrationError } = useSelector(
    (state) => state.user
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const role = 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const userData = { email, password, role, phoneNumber, address };

    try {
      const result = await dispatch(registerUser(userData));
      if (registerUser.fulfilled.match(result)) {
        Swal.fire({ icon: "success", text: "Register Successfully!" });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="login__main">
      <section
        class="bg-gray-50 dark:bg-gray-900"
        style={{
          borderRadius: "10px",
          boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
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
              Hello! We're the Japan Koi Fish
            </h1>
            <h4 style={{ textAlign: "center" }}>Please sign up to continue!</h4>
            <form
              class="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleRegister}
            >
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <label
                    for="number"
                    class="block mb-2 text-sm font-medium "
                    style={{ color: "grey" }}
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phonenumber"
                    id="phonenumber"
                    placeholder="0909090909"
                    style={{
                      background: "#EEEEEE",
                      color: "black",
                      border: "0.5px solid #e5e7eb",
                    }}
                    class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <label
                    for="place"
                    class="block mb-2 text-sm font-medium "
                    style={{ color: "grey" }}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="adress"
                    id="adress"
                    placeholder="Ho Chi Minh"
                    style={{
                      background: "#EEEEEE",
                      color: "black",
                      border: "0.5px solid #e5e7eb",
                    }}
                    class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              {/* <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium "
                  style={{ color: "grey" }}
                >
                  Role
                </label>
                <input
                  style={{
                    background: "#EEEEEE",
                    color: "black",
                    border: "0.5px solid #e5e7eb",
                  }}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Admin"
                  required=""
                  value={0}
                  readOn
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div> */}
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
                  name="email"
                  id="email"
                  style={{
                    background: "#EEEEEE",
                    color: "black",
                    border: "0.5px solid #e5e7eb",
                  }}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
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
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  style={{
                    background: "#EEEEEE",
                    color: "black",
                    border: "0.5px solid #e5e7eb",
                  }}
                  class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password}
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
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
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
                Already have account?
                <a
                  style={{ textDecoration: "underline" }}
                  href="/login"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
