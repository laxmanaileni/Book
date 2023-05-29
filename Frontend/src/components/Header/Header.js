import { NavLink } from "react-router-dom";
import "./Header.css"
const Header = () => {
  const navigation = [
    { path: "/", name: "List of Books" },
    { path: "/add", name: "Add New Book" },
  ];
  return (
    <div className="header" data-testid="header-component">
      <h1>Book Management System</h1>
      <nav>
        {navigation.map((nav) => (
          <NavLink key={nav.name} to={nav.path} >
            {nav.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Header;
