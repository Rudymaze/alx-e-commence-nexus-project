const Card = ({
  children,
  className = "",
  padding = true,
  hover = false,
  ...props
}) => {
  const baseClasses = "bg-white rounded-lg shadow";
  const paddingClass = padding ? "p-6" : "";
  const hoverClass = hover
    ? "transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
    : "";

  return (
    <div
      className={`${baseClasses} ${paddingClass} ${hoverClass} ${className}`}
      {...props}>
      {children}
    </div>
  );
};

export default Card;
