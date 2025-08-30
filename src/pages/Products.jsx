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
          </div>
        </section>
      </section>
    </>
  );
}

export default Products;
