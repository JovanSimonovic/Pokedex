import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonByName } from "../utils/pokeApiUtils";
import PokemonType from "./PokemonType";
import PokemonStat from "./PokemonStat";
import PokemonAbility from "./PokemonAbility";

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

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();

  // fetches data for selected pokemon
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (name) {
        const pokemonDetails = await fetchPokemonByName(name);
        setPokemonDetails(pokemonDetails);
      }
    };
    fetchPokemonDetails();
  }, [name]);

  return (
    <div className="mt-20 flex flex-col items-center md:h-screen md:justify-center md:mt-0">
      {pokemonDetails ? (
        <>
          <div className="flex flex-col items-center">
            <img
              src={pokemonDetails.sprites.other["official-artwork"].front_default}
              alt={`${pokemonDetails.name} image`}
              width="250px"
              height="250px"
            />
            <div className="text-xl font-semibold">
              #{pokemonDetails.id.toString().padStart(3, "0")}
            </div>
            <h1 className="text-4xl font-semibold">
              {pokemonDetails.name
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
            <div className="m-4">
              {pokemonDetails.types.map(({ type: { name } }, index) => (
                <PokemonType key={index} typeName={name} />
              ))}
            </div>
          </div>

          <div className="flex justify-center text-center font-semibold text-lg">
            <div className="px-4">
              BASE EXP: <br />
              {pokemonDetails.base_experience}
            </div>
            <div className="px-4">
              HEIGHT: <br />
              {pokemonDetails.height.toString().length === 1
                ? "0." + pokemonDetails.height
                : pokemonDetails.height.toString().slice(0, -1) +
                  "." +
                  pokemonDetails.height.toString().slice(-1)}{" "}
              m
            </div>
            <div className="px-4">
              WEIGHT: <br />
              {pokemonDetails.weight.toString().length === 1
                ? "0." + pokemonDetails.weight
                : pokemonDetails.weight.toString().slice(0, -1) +
                  "." +
                  pokemonDetails.weight.toString().slice(-1)}{" "}
              kg
            </div>
          </div>

          <div className="mx-auto my-4">
            <h2 className="text-3xl text-center font-semibold">Abilities</h2>
            <div className="flex justify-center flex-wrap text-lg">
              {pokemonDetails.abilities.map(({ ability: { name } }, index) => (
                <PokemonAbility key={index} abilityName={name} />
              ))}
            </div>
          </div>

          <div>
            {pokemonDetails.stats.map(
              ({ base_stat, stat: { name } }, index) => (
                <PokemonStat
                  key={index}
                  base_stat={base_stat}
                  statName={name}
                />
              )
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg text-error"></span>
          <p className="text-2xl">Loading Pokémon details...</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
