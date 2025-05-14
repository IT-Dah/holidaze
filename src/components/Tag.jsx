function Tag({ label }) {
  return (
    <span className="inline-block bg-badge text-sm text-primary font-semibold px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

export default Tag;
