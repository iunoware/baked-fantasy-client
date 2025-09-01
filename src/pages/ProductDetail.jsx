import ProductImageGallery from "../components/PDP/ProductImageGallery";
import ProductInfo from "../components/PDP/productInfo";
import ProductDetails from "../components/PDP/ProductDetails";
import RelatedProducts from "../components/PDP/RelatedProducts";

export default function ProductDetailsPage() {
  // 👉 mock data (replace later with real API or props)
  // Product Images
  const productImages = [
    "/images/cake-1.jpg",
    "/images/cake-2.jpg",
    "/images/cake-3.jpg",
  ];

  // Product Info
  const productInfo = {
    title: "Classic Vanilla Cake",
    price: 19.99,
    sizes: ["500g", "1kg", "2kg"],
  };

  // Product Details
  const productDetails = {
    description:
      "A light, fluffy vanilla sponge layered with creamy buttercream frosting. Perfect for birthdays, parties, and celebrations.",
    ingredients: [
      "All-purpose flour",
      "Vanilla extract",
      "Butter",
      "Sugar",
      "Eggs",
      "Milk",
    ],
    shipping:
      "Delivery available within 24 hours. Custom messages on cakes available upon request.",
  };

  // Related Products
  const relatedProducts = [
    {
      title: "Chocolate Truffle Cake",
      price: 24.99,
      image: "/images/cakes/choco-truffle.jpg",
    },
    {
      title: "Red Velvet Cake",
      price: 22.99,
      image: "/images/cakes/red-velvet.jpg",
    },
    {
      title: "Strawberry Shortcake",
      price: 21.5,
      image: "/images/cakes/strawberry-shortcake.jpg",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="order-2 lg:order-1">
          <ProductImageGallery images={productImages} alt={productInfo.title} />
        </div>
        <div className="order-1 lg:order-2">
          <ProductInfo {...productInfo} />
        </div>
      </div>

      {/* Product Details */}
      <ProductDetails {...productDetails} />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
