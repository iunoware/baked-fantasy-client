import Product from "../../components/Products.jsx";

function Cake() {
  return (
    <>
      {/* <Link to={`/products/cake/cake-1`} className="card"> */}
      <div className="cakes">
        {/* hero section */}
        <div className="hero bg-[url(/images/cake-hero.png)] bg-cover bg-center h-[80vh] flex justify-baseline items-center ps-10 ">
          <div className="w-4/12 text-9xl font-extrabold">Cakes</div>
        </div>
        {/* products */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 px-20 py-10">
          <Product
            img="/images/cake-2.jpg"
            subject="Rich chocolate cake with truffle filling and ganache topping"
            title="ChocolateCake"
            price="45"
          />
        </div>
      </div>
      {/* </Link> */}
    </>
  );
}

export default Cake;
