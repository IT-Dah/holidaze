function SearchBar({ placeholder = "Search..." }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="px-4 py-2 rounded border w-80 focus:outline-none focus:ring-2 focus:ring-cta"
    />
  );
}

export default SearchBar;
