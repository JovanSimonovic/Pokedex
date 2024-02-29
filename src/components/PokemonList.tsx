import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllPokemon } from "../utils/pokeApiUtils";
import SearchInput from "./SearchInput";
import PokemonCard from "./PokemonCard";
import BackToTopButton from "./BackToTopButton";
import FilterByType from "./FilterByType";

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
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

/* 
  TODO:
  Figure out how to implement pagination/infinite scrolling
  while keeping the search and filter by type features funtional
*/

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // fetches the initial list of pokemon names and urls
  useEffect(() => {
    const fetchPokemonData = async () => {
      const fetchedPokemonDetails: PokemonDetails[] = await fetchAllPokemon();
      setPokemonData(fetchedPokemonDetails);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, []);
  
  // filters the list of pokemon based on the input value and selected type
  const filteredPokemonList = pokemonData.filter((pokemon) => {
    const matchesSearch = pokemon.name.includes(inputText.trim().toLowerCase());

    const matchesType =
      selectedType === "" ||
      pokemon.types.some((type) => type.type.name === selectedType);

    return matchesSearch && matchesType;
  });

  return (
    <>
      <div className="flex flex-wrap justify-center items-center mt-20 mb-4">
        <SearchInput inputText={inputText} setInputText={setInputText} />
        <FilterByType setSelectedType={setSelectedType} />
      </div>
      <div className="flex flex-col justify-center items-center md:flex-grow">
        {isLoading ? (
          <div className="text-center max-md:mt-24">
            <div className="loading loading-spinner loading-lg text-error"></div>
            <p className="text-2xl">Loading Pokémon...</p>
          </div>
        ) : filteredPokemonList.length === 0 ? (
          <p className="text-2xl max-md:mt-24">Pokémon not found</p>
        ) : (
          <div className="flex flex-wrap justify-center">
            {filteredPokemonList.map((pokemon) => (
              <Link
                to={`/pokemon/${pokemon.name}`}
                key={pokemon.id}
                className="m-2"
              >
                <PokemonCard
                  name={pokemon.name}
                  imageUrl={
                    pokemon.sprites.other["official-artwork"].front_default
                  }
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
