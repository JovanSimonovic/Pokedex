interface StatProps {
  base_stat: number;
  statName: string;
}

const PokemonStat = ({ base_stat, statName }: StatProps) => {
  return (
    <>
      <div className="flex justify-center flex-col my-2 w-80">
        <div className="flex justify-between">
          <span>{statName.toUpperCase().replace("-", " ")}</span>
          <span>{base_stat}</span>
        </div>
        <progress
          className={`progress progress-error`}
          value={`${base_stat}`}
          max="200"
        ></progress>
      </div>
    </>
  );
};

export default PokemonStat;
