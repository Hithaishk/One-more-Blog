import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const profile = () => {
    navigate(`/profile/${currentUser?.id}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            One More Blog
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/?cat=art">
                ART
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/?cat=science">
                SCIENCE
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/?cat=technology">
                TECHNOLOGY
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/?cat=cinema">
                CINEMA
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/?cat=design">
                DESIGN
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/?cat=food">
                FOOD
              </Link>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={profile}
                    style={{ cursor: "pointer" }}
                  >
                    {currentUser?.username}
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link btn btn-primary text-danger d-flex align-items-center justify-content-center"
                to="/write"
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  padding: "0",
                  marginLeft: "10px",
                }}
              >
                Write
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
