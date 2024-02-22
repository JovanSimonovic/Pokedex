import axios from "axios";

interface PokemonList {
  name: string;
  url: string;
}

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

const totalPokemonCount = 386

export const fetchPokemonDetailsList = async (offset: number): Promise<PokemonDetails[]> => {
  const remainingPokemonCount = totalPokemonCount - offset;
  const limit = remainingPokemonCount > 40 ? 40 : remainingPokemonCount;

  // fetches the API response containing pokemon data and
  // assigns fetched data to the "fetchedPokemons" array
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const fetchedPokemons: PokemonList[] = response.data.results;

  // fetches data for each pokemon from the "fetchedPokemons" array
  // and assigns fetched data to the "pokemonDetailsResponses" array
  const pokemonDetailsRequests = fetchedPokemons.map((pokemon) =>
    axios.get(pokemon.url)
  );

  // "Promise.all" ensures that all the API requests are resolved before continuing
  const pokemonDetailsResponses = await Promise.all(pokemonDetailsRequests);

  // assigns pokemon details for each pokemon to the "fetchedPokemonDetails" array
  const fetchedPokemonDetails: PokemonDetails[] = pokemonDetailsResponses.map(
    (response) => response.data
  );

  return fetchedPokemonDetails;
};
