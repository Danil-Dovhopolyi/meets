import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to="/" class="nav-link" href="#">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/create" class="nav-link" href="#">
                Create Meet
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
