import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      // Handle successful registration, e.g., redirect to login page
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg border-0 rounded-3" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-4" style={{ color: "#343a40" }}>ONE MORE BLOG</h1>
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={{ color: "#343a40" }}>
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                name="username"
                value={inputs.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: "#343a40" }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: "#343a40" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: "#343a40" }}>
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
            {err && <div className="text-danger mb-3">{err}</div>}
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Register
            </button>
          </form>
          <div className="text-center">
            <span style={{ color: "#343a40" }}>Already have an account?</span>{" "}
            <Link to="/login" className="text-decoration-none" >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
