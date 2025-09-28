const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-secondary-DEFAULT text-white hover:bg-secondary-dark focus:ring-secondary-light",
    secondary:
      "bg-primary-DEFAULT text-secondary-dark hover:bg-primary-dark focus:ring-primary-light",
    outline:
      "border border-secondary-DEFAULT text-secondary-DEFAULT hover:bg-secondary-light hover:bg-opacity-10 focus:ring-secondary-light",
    ghost:
      "text-secondary-DEFAULT hover:bg-secondary-light hover:bg-opacity-10 focus:ring-secondary-light",
  };

  const sizes = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
