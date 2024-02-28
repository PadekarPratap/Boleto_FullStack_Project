import { useDispatch, useSelector } from "react-redux";
import { addSeat, removeSeat } from "../../redux/seatSlice";
import { useEffect, useState } from "react";

const TheatreSeat = ({ seat, backendSeats }) => {
  const seats = useSelector((state) => state.seats.seats);
  const dispatch = useDispatch();
  const [isReserved, setIsReserved] = useState(false);

  const isSelected = seats.find((s) => s.id === seat.id);

  useEffect(() => {
    setIsReserved(backendSeats?.data?.find((s) => s.name === seat.name));
  }, [backendSeats, seat.name]);

  // console.log(isReserved);

  const seatHandler = () => {
    if (isReserved) return;

    if (isSelected) {
      dispatch(removeSeat(seat));
    } else {
      dispatch(addSeat(seat));
    }
  };

  return (
    <>
      {isReserved ? (
        <div
          className={`w-16 h-16 rounded border border-black flex items-center justify-center hover:cursor-pointer hover:bg-teal-500 ${
            isReserved &&
            "hover:cursor-not-allowed bg-gray-700 text-white hover:bg-gray-700"
          }`}
        >
          {seat.name}
        </div>
      ) : (
        <div
          onClick={seatHandler}
          className={`w-16 h-16 rounded border border-black flex items-center justify-center hover:cursor-pointer hover:bg-teal-500  ${
            isSelected && "bg-teal-500 text-white"
          } `}
        >
          {seat.name}
        </div>
      )}
    </>
  );
};
export default TheatreSeat;
