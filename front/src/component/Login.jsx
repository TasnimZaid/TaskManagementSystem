import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:2000/auth/login", inputs);
      console.log("Success:", response.data);

      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Login</h1>
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
        <button type="submit" className="btn btn-success btn-block">
          Login
        </button>
        <div className="mt-3">
          <Link to="/register">Register</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
