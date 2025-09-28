import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import useCartStore from "../store/cartStore";

// Mock data
const product = {
  id: 1,
  name: "Classic Oxford Shirt",
  price: 79.99,
  description:
    "A timeless Oxford shirt crafted from premium cotton fabric. Features a button-down collar, regular fit, and a chest pocket. Perfect for both casual and formal occasions.",
  details: [
    "Premium 100% cotton",
    "Button-down collar",
    "Regular fit",
    "Chest pocket",
    "Machine washable",
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "White", value: "#FFFFFF", code: "white" },
    { name: "Light Blue", value: "#AFD2F0", code: "light-blue" },
    { name: "Pink", value: "#F6CECC", code: "pink" },
  ],
  images: [
    "/api/placeholder/600/800",
    "/api/placeholder/600/800",
    "/api/placeholder/600/800",
    "/api/placeholder/600/800",
  ],
  isNew: true,
  related: [2, 7, 4],
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor.name,
      image: product.images[0],
      quantity: quantity,
    });

    // Show success message or navigate to cart
    navigate("/cart");
  };

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="mb-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`border-2 rounded overflow-hidden ${
                  mainImage === image
                    ? "border-secondary-DEFAULT"
                    : "border-gray-200"
                }`}
                onClick={() => setMainImage(image)}>
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-auto"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          {product.isNew && (
            <div className="inline-block bg-secondary-DEFAULT text-white px-3 py-1 text-sm rounded mb-4">
              New Arrival
            </div>
          )}

          <h1 className="text-3xl font-bold text-secondary-dark mb-2">
            {product.name}
          </h1>
          <p className="text-2xl text-primary-dark font-medium mb-6">
            ${product.price.toFixed(2)}
          </p>

          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color: <span className="font-normal">{selectedColor.name}</span>
            </label>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color.code}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                    selectedColor.code === color.code
                      ? "border-secondary-DEFAULT"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color.name}`}>
                  {selectedColor.code === color.code && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill={color.name === "White" ? "black" : "white"}>
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`h-10 min-w-[40px] px-3 border rounded-md flex items-center justify-center ${
                    selectedSize === size
                      ? "border-secondary-DEFAULT bg-secondary-light bg-opacity-10 text-secondary-DEFAULT"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedSize(size)}>
                  {size}
                </button>
              ))}
            </div>
            {selectedSize === "" && (
              <p className="text-sm text-gray-500 mt-2">Please select a size</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex h-10 w-32">
              <button
                className="px-3 border border-r-0 border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-50"
                onClick={decrementQuantity}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full text-center border-t border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
              />
              <button
                className="px-3 border border-l-0 border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-50"
                onClick={incrementQuantity}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              className="flex-grow"
              onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="flex-grow">
              Add to Wishlist
            </Button>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-3 text-secondary-dark">
              Product Details
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
