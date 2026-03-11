import ProductCard from "./ProductCard";

/**
 * Wrapper for Bakery Products using the universal ProductCard.
 */
function Product(props) {
  return <ProductCard {...props} type="bakery" />;
}

export default Product;
