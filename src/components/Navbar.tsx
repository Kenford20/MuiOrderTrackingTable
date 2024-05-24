import { Container } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav-wrapper">
      <Container>
        <div id="navbar">
          <nav>
            <a id="logo" href="/" target="_blank">
              <img
                src="https://spotinc.com/wp-content/uploads/2023/12/logo.svg"
                className="logo"
                alt="Spot logo"
              />
            </a>
          </nav>
          <div id="navbar-actions">
            <SettingsIcon />
            <AccountCircleIcon />
          </div>
        </div>
      </Container>
    </div>
  );
}
