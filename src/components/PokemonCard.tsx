interface PokemonList {
  name: string;
  imageUrl: string;
}

const PokemonCard = ({ name, imageUrl }: PokemonList) => {
  return (
    <>
      <div className="card card-compact bg-base-100 shadow-lg transform transition duration-300 hover:scale-105 hover:cursor-pointer p-2">
        <figure>
          <img
            src={imageUrl}
            alt={`Image of ${name}`}
            width="150px"
            height="150px"
          />
        </figure>
        <div className="card-body items-center">
          <h2 className="card-title">
            {name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h2>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
