import PropTypes from "prop-types";

function Button({ children, type = "button", className = "", ...rest }) {
  return (
    <button
      type={type}
      className={`bg-primary text-white font-semibold px-4 py-2 rounded hover:opacity-90 shadow ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
