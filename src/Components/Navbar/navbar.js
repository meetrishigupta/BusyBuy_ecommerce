/** ------------------ IMPORTING CSS ------------------ **/
import Style from "./navbar.module.css";
/** ------------------ IMPORTING ROUTER MODULES ------------------ **/
import { NavLink, Outlet } from 'react-router-dom';
/** ------------------ IMPORTING HOOKS ------------------ **/
import { useValue } from '../../context';



/** ------------------ Function to show the Navbar ------------------ **/
function Navbar() {
  // Accessing values from the context
  const { userPresent, handleLogout, searchTerm, setSearchTerm } = useValue();

  // Function to handle search term change
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className={Style.navbar}>
        <NavLink to="/" className={Style.title}>
 Busy Buy
        </NavLink>
        {userPresent &&
          <div className={Style.searchBar}>
            <input
              type="text"
              placeholder="Search your dream product..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
        }
        <div className={Style.menu}>
      

          {userPresent ? (
            <>
              <NavLink
                to="/orders"
                style={({ isActive }) => isActive ? { color: "#FF8C00", boxShadow: "0 2px 0 rgba(0, 0, 0, 0.2)" } : {}}
              >
                My Orders
              </NavLink>

              <NavLink
                to="/cart"
                style={({ isActive }) => isActive ? { color: "#FF8C00", boxShadow: "0 2px 0 rgba(0, 0, 0, 0.2)" } : {}}
              >
                Cart
              </NavLink>

              <NavLink
                onClick={handleLogout}
                to="/home"
                style={({ isActive }) => isActive ? { color: "#FF8C00", boxShadow: "0 2px 0 rgba(0, 0, 0, 0.2)" } : {}}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/signin"
              style={({ isActive }) => isActive ? { color: "#FF8C00", boxShadow: "0 2px 0 rgba(0, 0, 0, 0.2)" } : {}}
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

/** ------------------ EXPORTING MODULES ------------------ **/
export default Navbar;
