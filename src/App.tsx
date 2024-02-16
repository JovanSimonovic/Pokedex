import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import Home from "./components/Home";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [navbarVisible, setNavbarVisible] = useState(false);

  // checks the current path name and sets "navbarVisible"
  // state variable to true if the path name is not "/"
  useEffect(() => {
    return location.pathname !== "/"
      ? setNavbarVisible(true)
      : setNavbarVisible(false);
  }, [location]);

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {navbarVisible && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemonList" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
