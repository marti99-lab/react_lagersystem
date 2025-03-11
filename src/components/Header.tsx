import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Inventory</Link> |  
      </nav>
    </header>
  );
};

export default Header;
