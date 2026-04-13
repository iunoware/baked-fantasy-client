/* eslint-disable no-unused-vars */
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import Product from "../../components/EssProduct";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

function ProductDetailPage({ onNavigate, onAddToCart }) {
  const { openLoginModal, isLoggedIn } = useAuth();
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const [added, setAdded] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  // const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  const cartItem = cartItems.find((item) => item.id === productId);
  const isInCart = !!cartItem;
  const quantity = cartItem ? cartItem.quantity : 1;

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

  const handleBuyNow = () => {
    const phone = "919003710091"; // your WhatsApp number (no +)
    const message = `Hi! I would like to order ${quantity} x ${product.title}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleQuantityChange = (change) => {
    if (change > 0) {
      increaseQuantity(productId);
    } else {
      decreaseQuantity(productId);
    }
  };

  const handleCart = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    addToCart({
      id: productId,
      name: product.title,
      price: product.discountedPrice || product.originalPrice,
      image: `http://localhost:5000${product.images?.[0]}`,
      description: product.description,
      type: "essential",
    });
    toast.success(`${product.title} added to cart!`);
  };

  // const handleAddToCart = () => {
  //   onAddToCart(product, quantity);
  // };

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
            className="flex items-center text-muted-foreground hover:text-[#870D32]"
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
                      ? "ring-2 ring-[#870D32]"
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
              <span className="text-3xl flex items-center justify-center gap-3 font-bold text-black">
                <span className="text-red-600/60 text-2xl line-through">
                  ₹{product.discountedPrice}
                </span>
                ₹{product.originalPrice}
              </span>
              {product.originalPrice && (
                <Badge className="bg-green-100 text-green-800">
                  {Math.round(
                    ((product.originalPrice - product.discountedPrice) /
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
              {/* <label>Quantity:</label> */}
              {/* <div className="flex items-center space-x-2 bg-white rounded-lg p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  // disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  // disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div> */}
              <span>
                Total:{" "}
                <strong className=" text-2xl text-[#870D32]">
                  ₹{(product.originalPrice * quantity).toFixed(2)}
                </strong>
              </span>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              {!isInCart ? (
                <button
                  className="group relative inline-flex cursor-pointer items-center overflow-hidden rounded-lg new-primary-text px-8 py-3 border border-current mr-3"
                  onClick={handleCart}
                  size="lg"
                >
                  <span className="absolute -start-full transition-all group-hover:start-4">
                    <svg
                      className="size-5 rtl:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                          stroke="#870D32"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </svg>
                  </span>

                  <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Add to cart
                  </span>
                </button>
              ) : (
                <div
                  size="lg"
                  className="space-x-2 group relative cursor-pointer inline-flex items-center overflow-hidden rounded-lg new-primary-text border border-current py-1.5 mr-3"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    className="cursor-pointer"
                    // disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    className="cursor-pointer"
                    // disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <button
                size="lg"
                className=" rounded-lg new-primary-bg cursor-pointer px-8 py-3 text-white"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
              <button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`${
                  isWishlisted ? "bg-red-50 text-red-600" : ""
                } cursor-pointer `}
              >
                <Heart className={isWishlisted ? "fill-current" : ""} />
              </button>
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
              // price={related.price}
              originalPrice={related.originalPrice}
              discountedPrice={related.discountedPrice}
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
