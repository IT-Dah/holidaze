function VenueCard({ title, location, price, tag, image }) {
  return (
    <div className="bg-[#F3FBFA] rounded-lg shadow-md p-4">
      <div className="rounded overflow-hidden mb-3">
        <img
          src={image}
          alt={title}
          className="w-[330px] h-[230px] object-cover mx-auto"
        />
      </div>
      <span className="inline-block bg-[#BFE2E4] text-sm text-primary font-semibold px-3 py-1 rounded-full mb-2">
        {tag}
      </span>
      <h3 className="text-lg font-bold font-heading">{title}</h3>
      <p className="text-sm">{location}</p>
      <div className="flex items-center my-2 text-yellow-500 text-sm">★★★★★</div>
      <p className="text-sm font-medium mb-3">{price}</p>
      <button className="bg-[#FD7C7C] text-white font-semibold px-4 py-2 rounded hover:opacity-90 w-full shadow">
        Book Now
      </button>
    </div>
  );
}

export default VenueCard;
