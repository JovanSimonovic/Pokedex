import { Link } from "react-router-dom";
import backgroundVideoLoop from "../assets/videos/home-background-loop.mp4";
import pokedexLogo from "../assets/images/pokedex-logo.jpg";

const Home = () => {
  return (
    <>
      <div>
        <video className="h-dvh w-dvw object-cover" autoPlay loop muted>
          <source src={backgroundVideoLoop} />
        </video>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <img src={pokedexLogo} alt="pokedex logo big" width="500px" />
            <Link
              to="/pokemonList"
              className="btn btn-wide text-lg bg-red-600 text-white hover:bg-red-700"
            >
              Browse Pokémon
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
