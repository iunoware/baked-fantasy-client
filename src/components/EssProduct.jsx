import ProductCard from "./ProductCard";

/**
 * Wrapper for Baking Essentials using the universal ProductCard.
 */
function Product(props) {
  return <ProductCard {...props} type="essential" />;
}

export default Product;
