import Heading from "../components/Heading.jsx";
import Category from "../components/Category.jsx";

function Products() {
  return (
    <>
      <section className="py-20">
        <Heading title="Explore Our Product Categories" />
        <p className="subHeading">
          Discover our wide range of handcrafted baked goods, made with premium
          ingredients and traditional techniques passed down through
          generations.
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 px-20 py-10">
          <Category
            img="../public/images/cake-1.jpg"
            color="pink"
            emoji="🍩"
            title="Donuts"
            subject="many varieties of donuts avail, grab now before its gone"
          />
          <Category
            img="../public/images/cake-2.jpg"
            color="blue"
            emoji="🍰"
            title="Cakes"
            subject="many varieties of Cakes avail, grab now before its gone"
          />
          <Category
            img="../public/images/cake-3.jpg"
            color="red"
            emoji="🍨"
            title="Desserts"
            subject="many varieties of Ice creams avail, grab now before its gone"
          />
          <Category
            img="../public/images/cake-3.jpg"
            color="yellow"
            emoji="🍨"
            title="Desserts"
            subject="many varieties of Ice creams avail, grab now before its gone"
          />
          <Category
            img="../public/images/cake-3.jpg"
            color="blue"
            emoji="🍨"
            title="Desserts"
            subject="many varieties of Ice creams avail, grab now before its gone"
          />
        </div>
        <section className="whyChooseUs flex justify-center">
          <div className="bg-gray-50 rounded-2xl w-9/12 h-screen">
            <h2 className="text-center text-5xl font-bold pt-10">
              Why Choose Our Products ?
            </h2>
            <p className="subHeading">
              Every item is crafted with care using the finest ingredients and
              time-honored techniques
            </p>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              <div className="card-1">
                <svg
                  viewBox="0 0 508 508"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fill="#F6339A"
                    d="M508,254c0,84.4-41.2,159.2-104.8,205.6C361.6,490,310,508,254,508..."
                  />
                  <path
                    fill="#2B3B4E"
                    d="M342,255.6c0,58.8-39.2,118.4-88,118.4s-88-59.6-88-118.4..."
                  />
                  <path
                    fill="#CED5E0"
                    d="M405.6,431.6c0,8.8-0.8,18.4-2.4,28C361.6,490,310,508,254,508..."
                  />
                  {/* ... continue converting your paths/circles exactly, just use fill="" instead of style */}
                </svg>
                <h2>Premium ingredients</h2>
                <p>
                  Only the finest, locally-sourced ingredients go into our
                  products
                </p>
              </div>
              <div className="card-2">
                <h2>Expert Craftsmanship</h2>
                <p>
                  Made by skilled bakers with years of professional experience
                </p>
              </div>
              <div className="card-3">
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <g>
                    <rect
                      x="3.013"
                      y="81.832"
                      width="344.974"
                      height="263.717"
                      fill="#F6339A"
                    />
                    <rect
                      x="3.025"
                      y="81.837"
                      width="19.757"
                      height="263.713"
                      fill="#D3B4D3"
                    />
                    <rect
                      x="328.231"
                      y="81.837"
                      width="19.758"
                      height="263.713"
                      fill="#A76BA7"
                    />
                    <path
                      d="M500.391,243.859v101.69H347.979V139.114h47.668c7.629,0,14.941,3.004,20.317,8.38 l76.009,76.048C497.347,228.918,500.391,236.23,500.391,243.859z"
                      fill="#fff"
                    />
                    {/* ... keep all paths/polygons from your SVG, just replace style="fill:xxx;" with fill="xxx" */}
                  </g>
                </svg>
                <h2>Fresh Delivery</h2>
                <p>Same-day delivery ensures you get the freshest products</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Products;
