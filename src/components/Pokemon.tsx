interface PokemonList {
  name: string;
  imageUrl: string;
}

const Pokemon = ({ name, imageUrl }: PokemonList) => {
  return (
    <>
      <div className="card card-compact bg-base-100 shadow-md transform transition duration-300 hover:scale-105 hover:cursor-pointer p-2">
        <figure>
          <img
            src={imageUrl}
            alt={`Image of ${name}`}
            width="175px"
            height="175px"
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

export default Pokemon;
