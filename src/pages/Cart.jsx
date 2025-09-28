import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import useCartStore from "../store/cartStore";

const Cart = () => {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleQuantityChange = (itemId, size, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(itemId, size, newQuantity);
    }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    // For demonstration purposes
    if (promoCode) {
      setPromoApplied(true);
    }
  };

  // Calculate order summary
  const shipping = totalPrice > 100 ? 0 : 7.99;
  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const estimatedTax = (totalPrice - discount) * 0.08;
  const orderTotal = totalPrice + shipping + estimatedTax - discount;

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-secondary-dark">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button as={Link} to="/shop">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8 text-secondary-dark">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <Card className="mb-6">
            <div className="mb-4 pb-4 border-b border-gray-200 flex justify-between">
              <h2 className="text-lg font-semibold">{totalItems} Items</h2>
              <button
                className="text-red-500 hover:text-red-700 text-sm font-medium"
                onClick={clearCart}>
                Clear Cart
              </button>
            </div>

            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex py-4 border-b border-gray-200 last:border-0">
                <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-secondary-dark">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      {item.color && (
                        <p className="text-sm text-gray-500">
                          Color: {item.color}
                        </p>
                      )}
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        className="w-8 h-8 border border-gray-300 rounded-l flex items-center justify-center"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}>
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
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            item.size,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-10 h-8 border-t border-b border-gray-300 text-center focus:outline-none"
                      />
                      <button
                        className="w-8 h-8 border border-gray-300 rounded-r flex items-center justify-center"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        disabled={item.quantity >= 10}>
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
                    <button
                      className="text-red-500 hover:text-red-700 text-sm"
                      onClick={() => removeItem(item.id, item.size)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <Button
            as={Link}
            to="/shop"
            variant="outline"
            className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Continue Shopping
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="mb-4">
              <form onSubmit={handleApplyPromo}>
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary-light border-gray-300"
                  />
                  <Button
                    type="submit"
                    className="rounded-l-none"
                    disabled={promoApplied}>
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm mb-4">
                    Promo code applied successfully! 10% off
                  </p>
                )}
              </form>
            </div>

            <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tax</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold mb-6">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>

            <Button as={Link} to="/checkout" fullWidth size="lg">
              Proceed to Checkout
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
