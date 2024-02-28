import { HiLanguage } from "react-icons/hi2";
import { CiGlobe } from "react-icons/ci";
import { TbRating18Plus } from "react-icons/tb";

const GENRE = [
  {
    id: 1,
    name: "Action",
    value: "action",
  },
  {
    id: 2,
    name: "Horror",
    value: "horror",
  },
  {
    id: 3,
    name: "Comedy",
    value: "comedy",
  },
  {
    id: 4,
    name: "Drama",
    value: "drama",
  },
];

const SearchBox = () => {
  return (
    <div className="mt-20 mx-auto w-[90vw] min-h-[30vh] bg-[url('/movie-collage.jpg')] bg-cover rounded opacity-90 px-12 py-6">
      <h3 className="text-white text-xl tracking-widest">welcome to boleto</h3>
      <h2 className="tracking-widest text-white text-4xl mt-4">
        What are you looking for...?
      </h2>
      <div className="w-full min-h-[20vh] bg-black/50 mt-4 px-4 py-2 flex items-center justify-between flex-wrap">
        <div>
          <input
            type="search"
            placeholder="Search for movies..."
            className="bg-transparent p-1 border-b-2 border-b-white text-white focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <HiLanguage color="white" size={25} />
          <label htmlFor="language" className="text-white text-lg">
            Language
          </label>
          <select
            id="language"
            className="focus:outline-none text-white bg-transparent"
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Select a language
            </option>
            <option className="text-black" value="english">
              English
            </option>
            <option className="text-black" value="hindi">
              Hindi
            </option>
            <option className="text-black" value="tamil">
              Tamil
            </option>
            <option className="text-black" value="telugu">
              Telugu
            </option>
          </select>
        </div>
        <div className="flex gap-3">
          <CiGlobe color="white" size={25} />
          <label htmlFor="genre" className="text-white text-lg">
            Genre
          </label>
          <select
            id="genre"
            className="focus:outline-none text-white bg-transparent"
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Select a genre
            </option>
            {GENRE.map((genre) => (
              <option key={genre.id} className="text-black" value={genre.value}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <TbRating18Plus color="white" size={25} />
          <label htmlFor="rating" className="text-white text-lg">
            Rating
          </label>
          <select
            id="rating"
            className="focus:outline-none text-white bg-transparent"
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Select a rating
            </option>
            <option className="text-black" value="G">
              G
            </option>
            <option className="text-black" value="PG">
              PG
            </option>
            <option className="text-black" value="PG13">
              PG13
            </option>
            <option className="text-black" value="R">
              R
            </option>
            <option className="text-black" value="N17">
              N17
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default SearchBox;
