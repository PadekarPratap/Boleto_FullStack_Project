import useBookings from "../../hooks/useBookings";

const Bookings = () => {
  const { data } = useBookings();

  console.log(data);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-secondary">
      <div className="container">
        {data?.data.length === 0 && (
          <div className="text-center text-3xl">
            No Bookings have been made.
          </div>
        )}
      </div>
    </div>
  );
};
export default Bookings;
