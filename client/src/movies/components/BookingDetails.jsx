import { useDispatch, useSelector } from "react-redux";
import Button from "../../shared/components/UIElements/Button";
import useBookSeats from "../../hooks/useBookSeats";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { clearSeats } from "../../redux/seatSlice";

const BookingDetails = () => {
  const { seats, totalPrice } = useSelector((state) => state.seats);
  const dispatch = useDispatch();

  const { theatreId, movieId } = useParams();

  const { mutate: bookSeats } = useBookSeats();

  const queryClient = useQueryClient();

  const handleBookSeats = () => {
    bookSeats(
      seats.map((seat) => ({
        name: seat.name,
        price: seat.price,
        row: seat.row,
        col: seat.col,
        is_reserved: true,
        theatre: theatreId,
        movie: movieId,
      })),
      {
        onSuccess: () => {
          // console.log("Seats added successfully!");
          toast.success("Seats booked successfully!");
          dispatch(clearSeats());
          queryClient.refetchQueries({
            queryKey: ["seats", theatreId, movieId],
          });
        },
      }
    );
  };

  return (
    <div className="bg-primary rounded text-white text-2xl min-h-[15rem] mt-16 flex items-center justify-around">
      <div>
        <h4>Seats you have selected</h4>
        {seats.map((seat) => seat.name).join(", ")}
      </div>

      <div>
        <h4>Total Price</h4>
        <p>{totalPrice}</p>
      </div>

      <div>
        <Button onClick={handleBookSeats} size="big" variant="primary">
          Proceed
        </Button>
      </div>
    </div>
  );
};
export default BookingDetails;
