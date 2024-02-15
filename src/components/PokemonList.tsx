import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import { fetchPokemonDetailsList } from "../services/fetchPokemonDetailsList";
import { Link } from "react-router-dom";

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
      <div className="flex flex-col bg-gray-100 items-center">
        <input
          type="text"
          placeholder="Find your Pokémon"
          className="input input-bordered w-full max-w-xs my-4"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {isLoading ? (
          <div className="flex flex-col items-center mt-40">
            <span className="loading loading-spinner loading-lg text-error"></span>
            <p className="text-2xl">Loading Pokémon...</p>
          </div>
        ) : filteredPokemonList.length === 0 ? (
          <p className="text-2xl">Pokémon not found</p>
        ) : (
          <div className="flex flex-wrap justify-center ">
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
    </>
  );
};

export default PokemonList;
