import { TypeAnimation } from "react-type-animation";
import SearchBox from "../../movies/components/SearchBox";

const HomePage = () => {
  return (
    <div className="bg-[url('/cinema-background.jpg')] w-screen min-h-[calc(100vh-4rem)] bg-cover">
      <div className="w-full min-h-[calc(100vh-4rem)] bg-black/30 flex flex-col justify-center">
        <div className="xl:ml-80 mx-auto text-white">
          <h1 className="sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-bold text-[#31d7a9]">
            <TypeAnimation
              sequence={[
                500,
                "get movie tickets",
                2000,
                "find new movies",
                2000,
                "watch trailers",
                2000,
                "read movie reviews",
                2000,
              ]}
              repeat={Infinity}
            />
          </h1>
          <p className="sm:text-base md:text-xl lg:text-2xl leading-loose tracking-widest mt-4">
            Buy movie tickets in advance, find movie time, watch trailers <br />{" "}
            Read movie reviews and much more
          </p>
        </div>
        <SearchBox />
      </div>
    </div>
  );
};
export default HomePage;
