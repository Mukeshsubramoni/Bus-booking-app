import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../Redux/slice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutAction());
    navigate("/login");
  }
  return (
    <div>
      <div>
        <div
          style={{ position: "fixed", width: "100%", zIndex: "1", top: "0" }}
        >
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link
              style={{ marginLeft: "1.5rem" }}
              to={"/dashboard"}
              class="navbar-brand"
            >
              HOME
            </Link>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div
                style={{ display: "flex", alignItems: "center" }}
                class="navbar-nav"
              >
                <Link class="nav-item nav-link" to="/yourTicket">
                  Your Tickets
                </Link>
                {/* <Link class="nav-item nav-link" to={"/planscreen"}>
                  Add Plan
                </Link> */}
              </div>
              <button
                style={{ marginTop: "0", marginLeft: "20px" }}
                class="btn btn-warning"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
