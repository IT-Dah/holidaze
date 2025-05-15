import PropTypes from "prop-types";

function InputField({ label, name, type = "text", ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full px-4 py-2 border rounded bg-accent text-primary focus:outline-none focus:ring-2 focus:ring-cta"
        {...rest}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default InputField;
