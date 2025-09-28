import { Link } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";
import useCartStore from "../../store/cartStore";

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0], // Default to first size
      quantity: 1,
    });
  };

  return (
    <Card hover className="h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <div className="relative h-64 mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute top-2 right-2 bg-secondary-DEFAULT text-white text-xs px-2 py-1 rounded">
              NEW
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-1 text-secondary-dark">
          {product.name}
        </h3>
        <p className="mb-2 text-primary-dark font-medium">
          ${product.price.toFixed(2)}
        </p>
      </Link>
      <div className="mt-auto pt-4">
        <Button variant="secondary" fullWidth onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
