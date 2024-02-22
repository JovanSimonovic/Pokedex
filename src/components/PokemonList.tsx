import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPokemonDetailsList } from "../services/fetchPokemonDetailsList";
import SearchInput from "./SearchInput";
import InfiniteScroll from "react-infinite-scroll-component";
import Pokemon from "./Pokemon";
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
  const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  // fetches the initial list of pokemon names and urls
  useEffect(() => {
    const fetchPokemonData = async () => {
      const fetchedPokemonDetails: PokemonDetails[] =
        await fetchPokemonDetailsList(offset);
      setPokemonData(fetchedPokemonDetails);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, []);

  // fetches additional list of pokemon names and urls
  const fetchMorePokemonData = async () => {
    const newOffset = offset + 40;
    const newData = await fetchPokemonDetailsList(newOffset);

    setPokemonData([...pokemonData, ...newData]);
    setOffset(newOffset);

    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  // filters the list of pokemon based on the input value
  const filteredPokemonList = pokemonData.filter((pokemon) =>
    inputText.toLowerCase() === ""
      ? pokemon
      : pokemon.name.includes(inputText.trim().toLowerCase())
  );

  return (
    <>
      <SearchInput inputText={inputText} setInputText={setInputText} />
      <div className="flex flex-col justify-center items-center md:flex-grow">
        {isLoading ? (
          <div className="text-center max-md:mt-24">
            <div className="loading loading-spinner loading-lg text-error"></div>
            <p className="text-2xl">Loading Pokémon...</p>
          </div>
        ) : filteredPokemonList.length === 0 ? (
          <p className="text-2xl max-md:mt-24">Pokémon not found</p>
        ) : (
          <InfiniteScroll
            dataLength={pokemonData.length}
            next={fetchMorePokemonData}
            hasMore={hasMore}
            loader={null}
          >
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
          </InfiniteScroll>
        )}
      </div>
      <BackToTopButton />
    </>
  );
};

export default PokemonList;
