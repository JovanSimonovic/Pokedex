interface AbilityProps {
  abilityName: string;
}

const PokemonAbility = ({ abilityName }: AbilityProps) => {
  return (
    <div className={`badge bg-red-600 badge-lg text-white font-semibold p-4 mx-0.5`}>
      {abilityName.toUpperCase().replace("-", " ")}
    </div>
  );
};

export default PokemonAbility;
