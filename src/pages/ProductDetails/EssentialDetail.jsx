import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import Product from "../../components/EssProduct";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";

function ProductDetailPage({ onNavigate, onAddToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  // for fetching the product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/bakingEssentials/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // for fetching the related product
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/essential/${productId}/related`
        );
        setRelatedProducts(res.data);
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchRelated();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Product not found</p>
      </div>
    );
  }

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
    onNavigate("checkout", { productId: product._id, quantity });
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1] py-15">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="flex items-center space-x-2 mb-8">
          <Link
            variant="ghost"
            size="sm"
            // onClick={() =>
            //   onNavigate("category-products", {
            //     category: product.category?.title || "Products",
            //   })
            // }
            to={`/essentials/${product.category?.title}`}
            className="flex items-center text-muted-foreground hover:text-[#00BCD4]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {product.category?.title || "Products"}
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl p-4 shadow-card">
              <img
                src={`http://localhost:5000${product.images?.[selectedImage]}`}
                alt={product.title}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`p-2 rounded-lg ${
                    selectedImage === index
                      ? "ring-2 ring-[#00BCD4]"
                      : "shadow hover:shadow-md"
                  }`}
                >
                  <img
                    src={`http://localhost:5000${image}`}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>4.6</span>
              <span className="text-muted-foreground">(124 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-[#00BCD4]">
                ₹{product.price}
              </span>
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

            <p className="text-muted-foreground">{product.description}</p>

            <Separator />

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <label>Quantity:</label>
              <div className="flex items-center space-x-2 bg-white rounded-lg p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span>
                Total:{" "}
                <strong className="text-[#00BCD4]">
                  ₹{(product.price * quantity).toFixed(2)}
                </strong>
              </span>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button
                size="lg"
                className="flex-1 bg-[#00BCD4] text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-[#FF80AB] text-white"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? "bg-red-50 text-red-600" : ""}
              >
                <Heart className={isWishlisted ? "fill-current" : ""} />
              </Button>
            </div>
          </div>
        </div>

        {/* Description & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-lg bg-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p>{product.description}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Product Info</h3>
              <p>{product.info || "No extra info available."}</p>
            </CardContent>
          </Card>
        </div>

        {/* Related */}
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((related) => (
            <Product
              key={related._id}
              id={related._id}
              category={related.category?.title}
              img={`http://localhost:5000${related.images?.[0]}`}
              price={related.price}
              title={related.title}
              subject={related.subject}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
