const typeColors: {[key: string]: string} = {
  normal: "bg-gray-500",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  ice: "bg-cyan-300",
  fighting: "bg-red-500",
  poison: "bg-purple-500",
  ground: "bg-yellow-500",
  flying: "bg-violet-500",
  psychic: "bg-rose-500",
  bug: "bg-lime-400",
  rock: "bg-yellow-600",
  ghost: "bg-purple-900",
  dragon: "bg-violet-900",
  dark: "bg-gray-600",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

interface TypeProps {
  typeName: string;
}

const PokemonType = ({ typeName }: TypeProps) => {
  const typeColor = typeColors[typeName.toLowerCase()];
  return (
    <div
      className={`badge badge-lg ${typeColor} text-white font-semibold p-4 mx-0.5`}
    >
      {typeName.toUpperCase()}
    </div>
  );
};

export default PokemonType;
