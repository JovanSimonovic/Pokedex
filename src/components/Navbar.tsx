import { Link } from "react-router-dom";
import pokedexLogo from "../assets/images/pokedex-logo.jpg";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <>
      <div className="navbar flex justify-center bg-red-600 text-white p-0 px-4 fixed top-0 w-full z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-red-600 rounded-box w-52 font-semibold"
            >
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/pokemonList">POKÉMON LIST</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost">
            <img src={pokedexLogo} alt="pokedex logo" width="125px" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:navbar-center">
          <ul className="menu menu-horizontal text-lg font-semibold">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/pokemonList">POKÉMON LIST</Link>
            </li>
          </ul>
        </div>
        <ThemeSwitch />
      </div>
    </>
  );
};

export default Navbar;
