import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import ProductCard from "../components/product/ProductCard";

// Mock data for demonstration
const featuredProducts = [
  {
    id: 1,
    name: "Classic Oxford Shirt",
    price: 79.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 2,
    name: "Tailored Wool Blend Pants",
    price: 129.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["30", "32", "34", "36"],
    isNew: false,
  },
  {
    id: 3,
    name: "Premium Leather Belt",
    price: 59.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["S", "M", "L"],
    isNew: true,
  },
  {
    id: 4,
    name: "Cashmere V-Neck Sweater",
    price: 149.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
  },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary-DEFAULT text-white">
        <div className="container-custom py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Elevate Your Style
            </h1>
            <p className="text-lg mb-8 max-w-lg">
              Discover premium men's clothing designed for the modern gentleman.
              Quality fabrics, timeless designs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg">
                Shop New Arrivals
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white">
                View Collections
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/api/placeholder/600/600"
              alt="Men's Fashion"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-dark">
              Featured Products
            </h2>
            <Link
              to="/shop"
              className="text-secondary-DEFAULT hover:underline font-medium">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Blocks */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-light rounded-lg overflow-hidden relative h-80">
              <img
                src="/api/placeholder/600/800"
                alt="Formal Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Formal Collection
                </h3>
                <Button variant="primary">Shop Now</Button>
              </div>
            </div>

            <div className="bg-primary-light rounded-lg overflow-hidden relative h-80">
              <img
                src="/api/placeholder/600/800"
                alt="Casual Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Casual Collection
                </h3>
                <Button variant="primary">Shop Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-DEFAULT py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-secondary-dark mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-secondary-DEFAULT mb-8 max-w-lg mx-auto">
            Stay updated with the latest trends, new arrivals, and exclusive
            offers.
          </p>

          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md border-0 focus:ring-2 focus:ring-secondary-light"
            />
            <Button className="rounded-l-none">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
