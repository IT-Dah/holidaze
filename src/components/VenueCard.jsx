import { Link, useNavigate } from "react-router-dom";
import Tag from "./Tag";

function VenueCard({ id, image, title, location, price, tags = [] }) {
  const navigate = useNavigate();

  function handleButtonClick(e) {
    e.stopPropagation();
    navigate(`/venues/${id}`);
  }

  const numericPrice = parseInt(price.toString().replace(/[^\d]/g, ""));
  const formattedPrice = `${numericPrice} EUR / night`;

  return (
    <Link
      to={`/venues/${id}`}
      className="block focus:outline-none focus:ring-2 focus:ring-cta"
    >
      <div className="bg-card rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer h-full">
        <div className="rounded overflow-hidden mb-3">
          <img
            src={image}
            alt={title}
            className="w-[330px] h-[230px] object-cover mx-auto"
          />
        </div>

        {/* Tag container with fixed height for consistency */}
        <div className="min-h-[2rem] flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <h3 className="text-lg font-bold font-heading">{title}</h3>
        <p className="text-sm">{location}</p>

        <p className="text-sm font-medium my-2">{formattedPrice}</p>

        <button
          onClick={handleButtonClick}
          className="bg-cta text-white font-semibold px-4 py-2 rounded hover:opacity-90 w-full shadow"
        >
          Book Now
        </button>
      </div>
    </Link>
  );
}

export default VenueCard;
