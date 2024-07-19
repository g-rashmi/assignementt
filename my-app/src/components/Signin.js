import axios from "axios";
import { useState } from "react";
import { backend_url } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Navbarr from "./Navbarr";


function Signin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handlesignin = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 2100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const data = JSON.stringify({
      password: password,
      username: username,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${backend_url}/v1/rest-auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const response = await axios.request(config);
      const dataa = response.data;
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const accessToken = dataa.data.access_token;
      localStorage.setItem('authToken', accessToken);
      navigate("/order");
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 2100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  return (
    <>
    <Navbarr/>
    <div className="container ">
    
      <ToastContainer
        position="top-right"
        autoClose={2100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="card shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
          <div className="card-body">
            <h2 className="text-center mb-4">Sign In</h2>
            <form onSubmit={handlesignin}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="card-footer text-center">
            <p className="mb-0">Don't have an account? <Link to="/">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default Signin;
