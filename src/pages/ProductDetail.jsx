import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  Star,
  Heart,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Leaf,
  Clock,
  Truck,
} from "lucide-react";

// Product Image Gallery Component
function ProductImageGallery({ images, alt }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-pink-50">
        <img
          src={images[selectedIndex]}
          alt={alt}
          className="h-full w-full object-cover"
        />

        {/* Navigation Arrows */}
        <Button
          variant="secondary"
          size="icon"
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
              selectedIndex === index
                ? "border-2 border-black ring-offset-2"
                : "hover:opacity-80"
            }`}
          >
            <img
              src={image}
              alt={`${alt} view ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Product Info Component
function ProductInfo({
  title,
  rating,
  reviewCount,
  price,
  originalPrice,
  description,
  sizes,
}) {
  const [selectedSize, setSelectedSize] = useState(sizes[0].value);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const selectedSizeData = sizes.find((size) => size.value === selectedSize);
  const currentPrice = selectedSizeData ? selectedSizeData.price : price;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="space-y-6">
      {/* Title and Favorite */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-medium text-gray-900">{title}</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-gray-400 hover:text-pink-500"
        >
          <Heart
            className={`h-6 w-6 ${
              isFavorite ? "fill-pink-500 text-pink-500" : ""
            }`}
          />
        </Button>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-gray-600">
          {rating} ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-gray-900">
          ${currentPrice.toFixed(2)}
        </span>
        {originalPrice && originalPrice > currentPrice && (
          <span className="text-xl text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        {originalPrice && originalPrice > currentPrice && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Save ${(originalPrice - currentPrice).toFixed(2)}
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{description}</p>

      {/* Size Selection */}
      <div className="space-y-3">
        <label className="text-lg font-medium text-gray-900">Size/Weight</label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="bg-gray-50 w-full h-12 text-lg rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {sizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                <div className="flex justify-between w-full">
                  <span>{size.label}</span>
                  <span className="ml-4 font-medium">
                    ${size.price.toFixed(2)}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <label className="text-lg font-medium text-gray-900">
          Enter Message on the cake
        </label>
        <input
          type="text"
          className="border-1 mt-0.5 w-full rounded-xl !border-black shadow-sm sm:text-sm h-12 md:text-lg lg:text-lg pl-3"
        />
      </div>

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-lg font-medium text-gray-900">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded-xl">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-12 w-12 rounded-l-xl"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-6 py-3 text-lg font-medium min-w-[80px] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
              className="h-12 w-12 rounded-r-xl"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-gray-600">
            Total: ${(currentPrice * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button className="w-full h-14 text-lg rounded-xl bg-pink-500 hover:bg-pink-600">
          Add to Cart
        </Button>
        <Button
          variant="outline"
          className="w-full h-14 text-lg rounded-xl border-pink-500 text-pink-500 hover:bg-pink-50"
        >
          Buy Now
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center p-4 bg-pink-50 rounded-xl">
          <div className="text-lg font-medium text-gray-900">Fresh Daily</div>
          <div className="text-sm text-gray-600">Baked fresh every morning</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-lg font-medium text-gray-900">Free Delivery</div>
          <div className="text-sm text-gray-600">On orders over $50</div>
        </div>
      </div>
    </div>
  );
}

// Product Details Component
function ProductDetails({
  description,
  ingredients,
  allergens,
  nutritionFacts,
  careInstructions,
}) {
  return (
    <div className="mt-16">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-14 rounded-xl bg-gray-50">
          <TabsTrigger value="description" className="text-lg rounded-lg">
            Description
          </TabsTrigger>
          <TabsTrigger value="ingredients" className="text-lg rounded-lg">
            Ingredients
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="text-lg rounded-lg">
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="care" className="text-lg rounded-lg">
            Care & Storage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-8">
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Product Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">
                {description}
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-medium">100% Natural</div>
                    <div className="text-sm text-gray-600">
                      No artificial preservatives
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="font-medium">Fresh Baked</div>
                    <div className="text-sm text-gray-600">Made to order</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                  <Truck className="h-6 w-6 text-purple-600" />
                  <div>
                    <div className="font-medium">Same Day</div>
                    <div className="text-sm text-gray-600">
                      Delivery available
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ingredients" className="mt-8">
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1 text-sm rounded-full"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>

                {allergens.length > 0 && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium text-orange-800">
                        Allergen Information
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allergens.map((allergen, index) => (
                        <Badge
                          key={index}
                          variant="destructive"
                          className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                        >
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="mt-8">
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle>Nutrition Facts</CardTitle>
              <p className="text-gray-600">Per serving (1 slice)</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nutritionFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium">{fact.label}</span>
                    <span className="text-gray-700">{fact.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="care" className="mt-8">
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle>Care & Storage Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careInstructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl"
                  >
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Related Products Component
function RelatedProducts({ products }) {
  return (
    <div className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium text-gray-900">
          You might also like
        </h2>
        <Button variant="outline" className="rounded-xl">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden"
          >
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Favorite Button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="h-4 w-4" />
              </Button>

              {/* Discount Badge */}
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </div>
                )}
            </div>

            <CardContent className="p-4 space-y-3">
              <h3 className="font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
              </div>

              {/* Add to Cart Button */}
              <Button className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  // Mock data for the chocolate truffle cake
  const productImages = [
    "/images/cake-1.jpg",
    "https://images.unsplash.com/photo-1716535232783-38a9e49eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjB0cnVmZmxlJTIwY2FrZXxlbnwxfHx8fDE3NTY3MzA2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1716535232783-38a9e49eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjB0cnVmZmxlJTIwY2FrZXxlbnwxfHx8fDE3NTY3MzA2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  const productInfo = {
    title: "Chocolate Truffle Cake",
    rating: 4.8,
    reviewCount: 127,
    price: 45.0,
    originalPrice: 55.0,
    description:
      "Indulge in our signature chocolate truffle cake - a decadent masterpiece featuring layers of rich chocolate sponge infused with premium dark chocolate ganache. Each slice is a perfect harmony of textures, with a moist cake base and silky smooth truffle filling that melts in your mouth.",
    sizes: [
      { value: "500g", label: "500g (4-6 servings)", price: 35.0 },
      { value: "1kg", label: "1kg (8-10 servings)", price: 45.0 },
      { value: "2kg", label: "2kg (16-20 servings)", price: 85.0 },
    ],
  };

  const productDetails = {
    description:
      "Our Chocolate Truffle Cake is crafted with the finest Belgian chocolate and premium ingredients. Each cake is hand-decorated by our master bakers and features a rich, moist chocolate sponge layered with velvety truffle ganache. The cake is finished with a glossy chocolate glaze and delicate chocolate shavings, making it perfect for celebrations or as an indulgent treat.",
    ingredients: [
      "Premium dark chocolate (70% cocoa)",
      "Fresh farm eggs",
      "Unsalted butter",
      "Pure vanilla extract",
      "All-purpose flour",
      "Cocoa powder",
      "Heavy cream",
      "Sugar",
      "Baking powder",
      "Sea salt",
    ],
    allergens: ["Eggs", "Dairy", "Gluten", "May contain nuts"],
    nutritionFacts: [
      { label: "Calories", value: "420" },
      { label: "Total Fat", value: "24g" },
      { label: "Saturated Fat", value: "15g" },
      { label: "Cholesterol", value: "85mg" },
      { label: "Sodium", value: "180mg" },
      { label: "Total Carbs", value: "48g" },
      { label: "Dietary Fiber", value: "4g" },
      { label: "Sugars", value: "38g" },
      { label: "Protein", value: "6g" },
    ],
    careInstructions: [
      "Store in refrigerator at 35-40°F (2-4°C) for optimal freshness",
      "Remove from refrigerator 30 minutes before serving for best texture",
      "Consume within 3-4 days of delivery for peak quality",
      "Keep covered to prevent drying out and absorbing other flavors",
      "For longer storage, wrap well and freeze for up to 2 months",
    ],
  };

  const relatedProducts = [
    {
      id: "1",
      name: "Fresh Strawberry Cake",
      price: 38.0,
      originalPrice: 42.0,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1667298216085-b0bf5a2e1944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwY2FrZSUyMHNsaWNlfGVufDF8fHx8MTc1NjczMDY0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      name: "Classic Vanilla Birthday Cake",
      price: 32.0,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1624975964661-4999f124a4c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwYmlydGhkYXklMjBjYWtlfGVufDF8fHx8MTc1NjczMDY0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "3",
      name: "Red Velvet Cream Cake",
      price: 42.0,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB2ZWx2ZXQlMjBjYWtlfGVufDF8fHx8MTc1NjczMDY0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "4",
      name: "Lemon Citrus Delight",
      price: 36.0,
      originalPrice: 40.0,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1678552882524-e94b282332e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbiUyMGNha2UlMjBzbGljZXxlbnwxfHx8fDE3NTY3MzA2NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="pt-25 min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="order-2 lg:order-1">
            <ProductImageGallery
              images={productImages}
              alt={productInfo.title}
            />
          </div>

          {/* Product Info */}
          <div className="order-1 lg:order-2">
            <ProductInfo {...productInfo} />
          </div>
        </div>

        {/* Product Details */}
        <ProductDetails {...productDetails} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </main>
    </div>
  );
}
