import { GraduationCap, SquarePen, X, Check } from "lucide-react";

function CategoryCardAdmin(props) {
  return (
    <div>
      {/* <h1>hello world</h1> */}
      {/* <p>Current category: {props.title}</p> */}
      <div className={`rounded-2xl bg-white shadow-xl m-2`}>
        <div className="rounded-xl h-60 w-auto !m-2 translate-y-2 flex align-bottom overflow-hidden">
          <img
            src={`http://localhost:5000${props.image}`}
            alt="course-img"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "/images/cake-2.jpg";
            }}
            className="rounded-xl w-full h-full object-center object-cover !z-0 hover:scale-104 transition-all duration-200"
          />
        </div>
        <div className="p-5 w-full">
          <h2 className="font-semibold text-2xl">{props.title}</h2>
          <p className="">{props.description}</p>

          <div className="mt-4 flex justify-between">
            {/* <div className="text-3xl font-bold text-pink-500">₹{props.price}</div> */}
            <div className="flex flex-row justify-center items-center gap-4">
              <div>
                <SquarePen
                  color="#808080"
                  size={20}
                  className="hover:text-black hover:cursor-pointer hover:-translate-y-1 transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor={props.sliderBtn}
                  className="group hover:cursor-pointer relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500"
                >
                  <input type="checkbox" id={props.sliderBtn} className="peer sr-only" />

                  <span className="absolute inset-y-0 start-0 m-1 grid size-4 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                    <Check size={10} />

                    <X size={10} />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCardAdmin;
