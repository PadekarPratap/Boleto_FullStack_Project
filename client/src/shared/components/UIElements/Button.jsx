import { Link } from "react-router-dom";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "normal",
  to,
  ...props
}) => {
  const classes = `${
    variant === "primary" && "bg-blue-700 hover:bg-blue-800 text-white"
  } ${variant === "danger" && "bg-red-700 hover:bg-red-800 text-white"} ${
    variant === "gradient" &&
    "from-[#ab1c1c] to-[#5560ff] bg-gradient-to-r text-white"
  }`;

  const sizes = `${size === "normal" && "text-base"} ${
    size === "big" && "text-2xl"
  } ${size === "small" && "text-sm"}`;

  if (to)
    return (
      <Link
        className={`px-4 py-2 font-medium rounded active:scale-95 transition-all duration-200 ${classes} ${sizes}`}
        {...props}
        to={to}
      >
        {children}
      </Link>
    );

  return (
    <button
      className={`px-4 py-2 font-medium rounded active:scale-95 transition-all duration-200 ${classes} ${sizes} disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
