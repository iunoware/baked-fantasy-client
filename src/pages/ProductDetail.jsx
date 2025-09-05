import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import Product from "../components/Products.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Plus,
  Minus,
  Clock,
  Users,
  Award,
  Shield,
} from "lucide-react";

function ProductDetailPage({ onNavigate, onAddToCart }) {
  const { productId } = useParams(); // comes from URL /products/:categoryName
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/products/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  // Mock product data - in real app, this would come from props or API
  // const product = {
  //   id: 1,
  //   name: `${products.name}`,
  //   category: `${products.category}`,
  //   price: `${products.price}`,
  //   originalPrice: `${products.ogPrice}`,
  //   images: [
  //     products.images.map((p) => {
  //       p.image;
  //     }),
  //   ],
  //   rating: 4.9,
  //   reviews: 124,
  //   description: `${products.description}`,
  //   allergens: ["Eggs", "Dairy", "Gluten"],
  //   storage: "Refrigerate for up to 5 days",
  //   features: [
  //     { icon: Award, text: "Award-winning recipe" },
  //     { icon: Shield, text: "Made with premium ingredients" },
  //     { icon: Clock, text: "Fresh baked daily" },
  //     { icon: Users, text: "Perfect for sharing" },
  //   ],
  // };

  const relatedProducts = [
    {
      id: 2,
      name: "Red Velvet Cake",
      price: 42.99,
      image:
        "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=300&h=300&fit=crop",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Vanilla Bean Cake",
      price: 38.99,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=300&fit=crop",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Lemon Drizzle Cake",
      price: 35.99,
      image:
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop",
      rating: 4.6,
    },
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleBuyNow = () => {
    onNavigate("checkout", { productId: product.id, quantity });
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1] page-transition py-15">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8 fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onNavigate("category-products", { category: product.category })
            }
            className="text-muted-foreground hover:text-[#00BCD4] btn-hover"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {product.category}
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4 fade-in">
            <div className="relative bg-white rounded-2xl p-4 shadow-card overflow-hidden group">
              <img
                src={`http://localhost:5000${product.images[selectedImage]}`}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />

              {product.originalPrice && (
                <Badge className="absolute top-6 right-6 bg-[#00BCD4] text-white scale-in">
                  Save ₹{(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative bg-white rounded-lg p-2 transition-all duration-300 hover:scale-105 ${
                    selectedImage === index
                      ? "ring-2 ring-[#00BCD4] shadow-lg"
                      : "shadow-soft hover:shadow-card"
                  }`}
                >
                  <img
                    src={`http://localhost:5000${image}`} // 👈 prepend backend URL
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6 fade-in-delay-1">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-[#00BCD4]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <Badge className="bg-green-100 text-green-800">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </Badge>
              )}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {product.features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-muted-foreground"
                  >
                    <IconComponent className="h-4 w-4 text-[#00BCD4]" />
                    <span>{feature.text}</span>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Quantity */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-foreground">
                  Quantity:
                </label>
                <div className="flex items-center space-x-3 bg-white rounded-lg p-2 shadow-soft">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="btn-hover"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="btn-hover"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total:{" "}
                  <span className="font-bold text-[#00BCD4]">
                    ₹{(product.price * quantity).toFixed(2)}
                  </span>
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  size="lg"
                  className="flex-1 bg-[#00BCD4] hover:bg-[#00ACC1] text-white btn-hover"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  className="flex-1 bg-[#FF80AB] hover:bg-[#FF5597] text-white btn-hover"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`btn-hover ${
                    isWishlisted ? "bg-red-50 border-red-200 text-red-600" : ""
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 ">
          <Card className="shadow-card fade-in shadow-lg rounded-2xl bg-white border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Description
              </h3>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="text-muted-foreground flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-[#00BCD4] rounded-full"></div>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card fade-in-delay-2 shadow-lg rounded-2xl bg-white border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Product Info
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Allergens:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.allergens.map((allergen, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Storage:</span>
                  <p className="font-medium">{product.storage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related */}
        <div className="fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <Product
                key={relatedProduct.id}
                img={
                  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop"
                }
                price={499}
                title={"strawberry cake"}
                subject={"THis is strawberry cake"}
                onClick={() =>
                  onNavigate("product-detail", { productId: relatedProduct.id })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetailPage;
