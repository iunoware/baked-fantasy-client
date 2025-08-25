import heroImage from "../assets/images/bfHero.png";
import ambassador from "../assets/images/BakedMamImage.png";

function Home() {
  return (
    <>
      <section
        className="overflow-hidden bg-cover bg-no-repeat h-screen grid grid-cols-1 md:grid-cols-2"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* left column */}
        <div className="p-8 md:p-12 lg:px-16 lg:py-24 mt-35">
          <div className="text-start ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              From Oven to Heart – and From Us to Your Kitchen.
            </h2>

            <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              The Baked Fantasy brings you fresh cakes, pastries, and desserts
              made with love. Celebrate life’s moments with us—or join our
              baking courses to create your own oven-fresh treats at home.
            </p>
            <div className="flex gap-10 items-center">
              <div className="mt-4 sm:mt-8">
                <a
                  href="#"
                  className="bg-sky-500 inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                >
                  Shop products
                </a>
              </div>
              <div className="mt-4 sm:mt-8">
                <a
                  href="#"
                  className="bg-pink-500 inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                >
                  Explore course
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* right column */}
        <div>
          <img src={ambassador} alt="" />
        </div>
      </section>
    </>
  );
}

export default Home;
