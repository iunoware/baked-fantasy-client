import { Link } from "react-router-dom";

function Category(props) {
  return (

    // <Link to={`/products/${props.title}`} className="card">
    //   <article className="cat-card overflow-hidden rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-200 ">
    //     <div className="relative h-56 p-2 bg-white">
    //       <img
    //         alt={props.title}
    //         src={`http://localhost:5000${props.img}`}
    //         className="h-full w-full object-cover rounded-lg cat-img"
    //       />

    //       <div className="hover-content">
    //         <div className="bg-white rounded-lg px-4 py-2 font-bold shadow">
    //           Explore {props.title}
    //         </div>
    //       </div>
    //     </div>

    //     <div className="bg-white p-4 sm:p-6">
    //       <h2 className="font-bold text-black text-2xl">{props.title}</h2>
    //       <p className="mt-2 text-sm text-gray-600">{props.subject}</p>
    //     </div>
    //   </article>
    // </Link>

    <Link to={`/products/${props.title}`} className="card">
      <article className="cat-card overflow-hidden rounded-[50%] h-70 w-70 shadow-lg hover:-translate-y-2 transition-all duration-200 ">
        <div className="relative h-full w-full p-2 bg-white">
          <img
            alt={props.title}
            src={`http://localhost:5000${props.img}`}
            className="h-full w-full rounded-[50%] object-cover cat-img"
          />

          <div className="hover-content">
            <div className="bg-white rounded-full px-4 py-2 font-bold shadow">
              Explore {props.title}
            </div>
          </div>
        </div>
      </article>
      <div className="p-4 flex justify-center sm:p-6">
        <h2 className="font-bold lora text-black text-2xl">{props.title}</h2>
        {/* <p className="mt-2 text-sm text-gray-600">{props.subject}</p> */}
      </div>
    </Link>
  );
}

export default Category;
