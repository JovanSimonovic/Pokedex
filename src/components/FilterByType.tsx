interface FilterByTypeProps {
  setSelectedType: (type: string) => void;
}

const FilterByType = ({ setSelectedType }: FilterByTypeProps) => {
  return (
    <select
      className="select select-bordered mt-2 w-full max-w-xs sm:w-auto sm:mt-0 sm:ml-2"
      onChange={(e) => setSelectedType(e.target.value)}
    >
      <option disabled selected value="">
        Filter by type
      </option>
      <option value="">All</option>
      <option value="normal">Normal</option>
      <option value="fire">Fire</option>
      <option value="water">Water</option>
      <option value="grass">Grass</option>
      <option value="electric">Electric</option>
      <option value="ice">Ice</option>
      <option value="fighting">Fighting</option>
      <option value="poison">Poison</option>
      <option value="ground">Ground</option>
      <option value="flying">Flying</option>
      <option value="psychic">Psychic</option>
      <option value="bug">Bug</option>
      <option value="rock">Rock</option>
      <option value="ghost">Ghost</option>
      <option value="dragon">Dragon</option>
      <option value="dark">Dark</option>
      <option value="steel">Steel</option>
      <option value="fairy">Fairy</option>
    </select>
  );
};

export default FilterByType;
