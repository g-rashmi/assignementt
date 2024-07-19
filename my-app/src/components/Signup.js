import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { backend_url } from '../config';
import Navbarr from "./Navbarr";

function Signup() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (role === "" || email === "" || username === "" || name === "" || phone === "" || password === "") {
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

    const data = {
      username: username,
      password: password,
      email: email,
      name: name,
      phone_number: phone,
      role: role,
    };

    try {
      const response = await axios.post(`${backend_url}/v1/rest-auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Registered successfully", {
        position: "top-right",
        autoClose: 2100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(response);
    } catch (error) {
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 2100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error(error);
    }
  };

  return (
    <>
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
      <Navbarr/>
      <div className="container mt-2 ">
        <div className="d-flex justify-content-center">
          <div className="card p-2" style={{ maxWidth: "500px", width: "100%" }}>
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  aria-label="Select role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>Select your role</option>
                  <option value="RESTAURANT">Restaurant</option>
                  <option value="CUSTOMER">Customer</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
            <div className="mt-3 text-center">
              Already have an account? <Link to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
