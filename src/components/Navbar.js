import { UseGlobalContext } from "../context";
import { allMealsUrl } from "../context";

const Navbar = () => {
  const { fetchMeals } = UseGlobalContext();
  return (
    <nav className="navbar ">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <a href="" onClick={() => fetchMeals(allMealsUrl)}>
            Home
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
