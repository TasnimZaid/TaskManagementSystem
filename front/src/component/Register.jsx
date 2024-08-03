import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register({ setIsAuthenticated }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:2000/auth/register", inputs);
      console.log("Success:", response.data);

      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      toast.success("Registration successful!"); // Success toast
    } catch (error) {
      console.error("Error:", error);
      toast.error("Registration failed. Please try again."); // Error toast
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={onChange}
          className="form-control my-3"
        />
        <button type="submit" className="btn btn-success btn-block">
          Submit
        </button>
      </form>
      {/* Toast container is usually placed in the root component */}
      {/* If not already present, include it in your App component or the main component */}
    </>
  );
}

export default Register;
