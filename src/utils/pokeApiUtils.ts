import axios, { AxiosError } from "axios";

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
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

// fetches the list of all Pokemon from the API
export const fetchAllPokemon = async (): Promise<PokemonDetails[]> => {
  try {
    // fetches the API response containing pokemon data and
    // assigns fetched data to the "fetchedPokemons" array
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=1025`
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios error: ", axiosError.message);
      console.error("Status code: ", axiosError.response?.status);
    } else {
      console.error("Error fetching Pokémon: ", error);
    }

    throw error;
  }
};

// fetches the list of first 386 Pokemon from the API in batches of 40
const totalPokemonCount = 386;

export const fetchAdditionalPokemon = async (
  offset: number
): Promise<PokemonDetails[]> => {
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

// fetches the list of Pokemon based on provided name
export const fetchPokemonByName = async (
  name: string
): Promise<PokemonDetails> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};

// fetches the list of Pokemon based on provided type
export const fetchPokemonByType = async (
  type: string
): Promise<PokemonDetails> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  return response.data;
};
