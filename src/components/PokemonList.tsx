import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAdditionalPokemon } from "../utils/pokeApiUtils";
import { fetchAllPokemon } from "../utils/pokeApiUtils";
import SearchInput from "./SearchInput";
import InfiniteScroll from "react-infinite-scroll-component";
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
      }
    }
  };
}

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  // fetches the initial list of pokemon names and urls
  useEffect(() => {
    const fetchPokemonData = async () => {
      const fetchedPokemonDetails: PokemonDetails[] =
        await fetchAllPokemon();
      setPokemonData(fetchedPokemonDetails);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, []);

  // fetches additional list of pokemon names and urls
  const fetchMorePokemonData = async () => {
    const newOffset = offset + 40;
    const newData = await fetchAdditionalPokemon(newOffset);

    setPokemonData([...pokemonData, ...newData]);
    setOffset(newOffset);

    if (newData.length === 0) {
      setHasMore(false);
    }
  };


  // TODO: Figure out how to query pokemon based on the input while having infinite scrolling running in the background. Best bet would probably be fetching from an API with name as argument "api_url/pokemon/{name}" and to fetch every time a user changes the value

  // filters the list of pokemon based on the input value
  const filteredPokemonList = pokemonData.filter((pokemon) =>
    inputText.toLowerCase() === ""
      ? pokemon
      : pokemon.name.includes(inputText.trim().toLowerCase())
  );


  return (
    <>
      <div className="flex flex-wrap justify-center items-center mt-20 mb-4">
        <SearchInput inputText={inputText} setInputText={setInputText} />
        <FilterByType />
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
          // <InfiniteScroll
          //   dataLength={pokemonData.length}
          //   next={fetchMorePokemonData}
          //   hasMore={hasMore}
          //   loader={null}
          // >
            <div className="flex flex-wrap justify-center bg-gray-200">
              {filteredPokemonList.map((pokemon) => (
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  key={pokemon.id}
                  className="m-2"
                >
                  <PokemonCard
                    name={pokemon.name}
                    imageUrl={pokemon.sprites.other["official-artwork"].front_default}
                  />
                </Link>
              ))}
            </div>
          // </InfiniteScroll>
        )}
      </div>
      <BackToTopButton />
    </>
  );
};

export default PokemonList;
