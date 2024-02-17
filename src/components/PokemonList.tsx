import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import { fetchPokemonDetailsList } from "../services/fetchPokemonDetailsList";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
  };
}

const PokemonList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);

  // fetches the list of pokemon names and urls
  useEffect(() => {
    const fetchPokemonData = async () => {
      const fetchedPokemonDetails: PokemonDetails[] =
        await fetchPokemonDetailsList();
      setPokemonData(fetchedPokemonDetails);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, []);

  // filters the list of pokemon based on the input value
  const filteredPokemonList = pokemonData.filter((pokemon) =>
    inputText.toLowerCase() === ""
      ? pokemon
      : pokemon.name.includes(inputText.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Find your Pokémon"
        className="input input-bordered w-full max-w-xs mx-auto mt-20 mb-4 p-4 text-lg"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="flex flex-col justify-center items-center flex-grow">
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-lg text-error"></span>
            <p className="text-2xl">Loading Pokémon...</p>
          </>
        ) : filteredPokemonList.length === 0 ? (
          <p className="text-2xl">Pokémon not found</p>
        ) : (
          <div className="flex flex-wrap justify-center bg-gray-200">
            {filteredPokemonList.map((pokemon) => (
              <Link
                to={`/pokemon/${pokemon.name}`}
                key={pokemon.id}
                className="m-2"
              >
                <Pokemon
                  name={pokemon.name}
                  imageUrl={pokemon.sprites.front_default}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
      <BackToTopButton />
    </>
  );
};

export default PokemonList;
