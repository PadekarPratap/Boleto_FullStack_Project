import { useParams } from "react-router-dom";
import useSeats from "../../hooks/useSeats";
import TheatreSeat from "../components/TheatreSeat";
import { seats } from "../../constants/seats";
import BookingDetails from "../components/BookingDetails";
import { useSelector } from "react-redux";

const TheatreDetails = () => {
  const { theatreId, movieId } = useParams();

  const { data } = useSeats(theatreId, movieId);

  const { totalPrice } = useSelector((state) => state.seats);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-secondary">
      <div className="container">
        <h1 className="uppercase text-center text-5xl">Screen</h1>
        <hr className="mt-4 w-96 mx-auto border border-black" />

        <div className="max-w-[60rem] mx-auto pt-12 mt-12">
          <div className="flex gap-2 items-center">
            <div>G</div>
            {seats.slice(0, 12).map((seat) => (
              <TheatreSeat key={seat.id} seat={seat} backendSeats={data} />
            ))}
          </div>

          <div className="flex gap-2 items-center mt-8">
            <div>F</div>
            {seats.slice(12).map((seat) => (
              <TheatreSeat key={seat.id} seat={seat} backendSeats={data} />
            ))}
          </div>
        </div>

        {totalPrice > 0 && <BookingDetails />}
      </div>
    </div>
  );
};
export default TheatreDetails;
