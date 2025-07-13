interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
}

const Button = ({
  label,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) => {
  let className =
    "py-2 px-4 rounded w-full mt-4 transition-colors duration-200 ";

  if (variant === "primary") {
    className += "bg-blue-500 text-white hover:bg-blue-600";
  } else if (variant === "secondary") {
    className += "bg-gray-200 text-meliBlue hover:bg-gray-300";
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default Button;
