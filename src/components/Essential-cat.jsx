import { Link } from "react-router-dom";
import { useMemo } from "react";

function EssCategory(props) {
  //   const colors = {
  //     pink: "bg-pink-400/30",
  //     blue: "bg-cyan-400/30",
  //     yellow: "bg-yellow-400/30",
  //     green: "bg-green-400/30",
  //     purple: "bg-purple-400/30",
  //     red: "bg-red-400/30",
  //     orange: "bg-orange-400/30",
  //     teal: "bg-teal-400/30",
  //     indigo: "bg-indigo-400/30",
  //     lime: "bg-lime-400/30",
  //     amber: "bg-amber-400/30",
  //     emerald: "bg-emerald-400/30",
  //     sky: "bg-sky-400/30",
  //     rose: "bg-rose-400/30",
  //     violet: "bg-violet-400/30",
  //     fuchsia: "bg-fuchsia-400/30",
  //   };

  //   const randomColor = useMemo(() => {
  //     const keys = Object.keys(colors);
  //     const randomIndex = Math.floor(Math.random() * keys.length);
  //     return colors[keys[randomIndex]];
  //   }, []);

  return (
    <Link to={`/essentials/${props.title}`} className="card">
      <article className="cat-card overflow-hidden rounded-lg shadow-lg hover:-translate-y-2 transition-all duration-200 ">
        <div className="relative h-56">
          <img
            alt={props.title}
            src={`http://localhost:5000${props.img}`}
            className="h-full w-full object-cover cat-img"
          />

          {/* <div className={`absolute inset-0 ${randomColor}`}></div> */}

          {/* Centered hover button */}
          <div className="hover-content">
            <div className="bg-white rounded-lg px-4 py-2 font-bold shadow">
              Explore {props.title}
            </div>
          </div>

          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2">
              <div>
                <h3 className="font-bold text-black text-2xl">{props.title}</h3>
                <p className="text-sm text-black">15 products</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom white content */}
        <div className="bg-white p-4 sm:p-6">
          <p className="mt-2 text-sm text-gray-600">{props.subject}</p>
        </div>
      </article>
    </Link>
  );
}

export default EssCategory;
