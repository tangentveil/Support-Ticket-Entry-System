import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h2>Support Ticket Entry System</h2>

        <nav>
          <NavLink to="/support-agents" className="nav-links" activeclassname="active">
            <p>Agents</p>
          </NavLink>
          <NavLink to="/support-tickets" className="nav-links" activeclassname="active">
            <p>Tickets</p>
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
