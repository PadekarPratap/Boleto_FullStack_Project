import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { name, description, image, language, genre } = movie;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="w-[20rem] min-h-[5rem] rounded-md bg-white block hover:scale-105 transition duration-300 overflow-hidden"
    >
      <img src={image} alt={name} className="mx-auto w-full h-[28rem]" />
      {/* content of the card  */}
      <div className="p-4">
        <h4 className="text-3xl my-3 tracking-wider text-center">{name}</h4>
        <p className="line-clamp-3 text-center">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="px-4 py-2 rounded-full bg-primary text-white">
            {genre}
          </span>
          <span className="px-4 py-2 rounded-full bg-blue-600 text-white">
            {language}
          </span>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;
