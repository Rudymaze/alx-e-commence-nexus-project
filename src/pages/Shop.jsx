import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import ProductCard from "../components/product/ProductCard";
import { Select } from "../components/common/FormElement";

// Mock data for demonstration
const allProducts = [
  {
    id: 1,
    name: "Classic Oxford Shirt",
    price: 79.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["S", "M", "L", "XL"],
    category: "shirts",
    isNew: true,
  },
  {
    id: 2,
    name: "Tailored Wool Blend Pants",
    price: 129.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["30", "32", "34", "36"],
    category: "pants",
    isNew: false,
  },
  {
    id: 3,
    name: "Premium Leather Belt",
    price: 59.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["S", "M", "L"],
    category: "accessories",
    isNew: true,
  },
  {
    id: 4,
    name: "Cashmere V-Neck Sweater",
    price: 149.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["S", "M", "L", "XL"],
    category: "sweaters",
    isNew: false,
  },
  {
    id: 5,
    name: "Slim Fit Chino Pants",
    price: 89.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["30", "32", "34", "36"],
    category: "pants",
    isNew: false,
  },
  {
    id: 6,
    name: "Merino Wool Cardigan",
    price: 129.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["S", "M", "L", "XL"],
    category: "sweaters",
    isNew: true,
  },
  {
    id: 7,
    name: "Linen Button-Up Shirt",
    price: 69.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["S", "M", "L", "XL"],
    category: "shirts",
    isNew: false,
  },
  {
    id: 8,
    name: "Silk Tie",
    price: 49.99,
    images: ["/api/placeholder/400/500"],
    sizes: ["ONE SIZE"],
    category: "accessories",
    isNew: true,
  },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    sort: "newest",
    priceRange: "all",
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "shirts", label: "Shirts" },
    { value: "pants", label: "Pants" },
    { value: "sweaters", label: "Sweaters" },
    { value: "accessories", label: "Accessories" },
    { value: "new", label: "New Arrivals" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "Under $50" },
    { value: "50-100", label: "From $50 to $100" },
    { value: "100-150", label: "From $100 to $150" },
    { value: "150-plus", label: "Over $150" },
  ];

  useEffect(() => {
    // Filter products
    let filteredProducts = [...allProducts];

    if (filters.category === "new") {
      filteredProducts = filteredProducts.filter((product) => product.isNew);
    } else if (filters.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    // Filter by price range
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-");
      if (max === "plus") {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= Number(min)
        );
      } else {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.price >= Number(min) && product.price <= Number(max)
        );
      }
    }

    // Sort products
    switch (filters.sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // newest
        // For this example, we'll assume id represents newness
        filteredProducts.sort((a, b) => b.id - a.id);
    }

    setProducts(filteredProducts);

    // Update URL params
    if (filters.category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", filters.category);
    }
    setSearchParams(searchParams);
  }, [filters, searchParams, setSearchParams]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6 text-secondary-dark">
        {filters.category === "all"
          ? "All Products"
          : filters.category === "new"
          ? "New Arrivals"
          : `${
              filters.category.charAt(0).toUpperCase() +
              filters.category.slice(1)
            }`}
      </h1>

      {/* Mobile Filters */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="w-full flex justify-between items-center">
          <span>Filters & Sorting</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>

        {mobileFiltersOpen && (
          <Card className="mt-2 p-4">
            <Select
              label="Category"
              id="mobile-category"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              options={categories}
            />

            <Select
              label="Sort By"
              id="mobile-sort"
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              options={sortOptions}
            />

            <Select
              label="Price Range"
              id="mobile-price"
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              options={priceRanges}
            />
          </Card>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filters */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Card className="sticky top-6">
            <h2 className="text-lg font-semibold mb-4 text-secondary-dark">
              Filters
            </h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.value}>
                    <button
                      className={`text-left w-full py-1 ${
                        filters.category === category.value
                          ? "text-secondary-DEFAULT font-medium"
                          : "text-gray-600 hover:text-secondary-DEFAULT"
                      }`}
                      onClick={() =>
                        handleFilterChange("category", category.value)
                      }>
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <ul className="space-y-2">
                {priceRanges.map((range) => (
                  <li key={range.value}>
                    <button
                      className={`text-left w-full py-1 ${
                        filters.priceRange === range.value
                          ? "text-secondary-DEFAULT font-medium"
                          : "text-gray-600 hover:text-secondary-DEFAULT"
                      }`}
                      onClick={() =>
                        handleFilterChange("priceRange", range.value)
                      }>
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
        {/* Product Grid */}
        <div className="flex-grow">
          {/* Sort Options (Desktop) */}
          <div className="hidden md:flex justify-end mb-6">
            <div className="w-64">
              <Select
                label="Sort By"
                id="desktop-sort"
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                options={sortOptions}
              />
            </div>
          </div>

          {/* Products */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-600 mb-6">
                Try changing your filters or check back later for new items.
              </p>
              <Button
                onClick={() =>
                  setFilters({
                    category: "all",
                    sort: "newest",
                    priceRange: "all",
                  })
                }>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
