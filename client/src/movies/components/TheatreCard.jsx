import { Link } from "react-router-dom";

const TheatreCard = ({ theatre, movieId }) => {
  const { name, city, address, phone, website } = theatre;

  return (
    <Link
      to={`/theatre/${theatre.id}/${movieId}`}
      className="bg-black/85 block text-white px-5 py-3 rounded"
    >
      <div className="text-2xl font-medium">{name}</div>
      <div>
        <span className="italic">
          {city}, {address}
        </span>
      </div>
      <div>
        <span>Phone: {phone}</span>
        {website && <span>Website: {website}</span>}
      </div>
    </Link>
  );
};
export default TheatreCard;
