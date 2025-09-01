export default function RelatedProducts({ products }) {
  return (
    <div className="pt-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div
            key={i}
            className="border rounded-xl overflow-hidden hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-medium text-gray-900">
                {product.title}
              </h3>
              <p className="text-pink-500 font-semibold">${product.price}</p>
              <button className="w-full h-10 rounded-lg bg-pink-500 text-white hover:bg-pink-600">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
