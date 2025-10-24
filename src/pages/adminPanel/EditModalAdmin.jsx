// import { useState } from "react";

// haven't used this component anywhere.

// function EditModalAdmin(props) {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   return (
//     <>
//       <div
//         className={`${
//           isModalVisible ? "block" : "hidden"
//         } fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="modalTitle"
//       >
//         <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
//           <div className="flex items-start justify-between">
//             <h2 id="modalTitle" className="text-3xl font-bold text-gray-900 sm:text-2xl">
//               Add new Category
//             </h2>

//             <button
//               type="button"
//               onClick={() => setIsModalVisible(false)}
//               className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
//               aria-label="Close"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="size-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="mt-4 flex flex-col gap-3">
//             {/* <p className="text-pretty text-gray-700">this is a test run</p> */}
//             <div className="flex gap-3 justify-between items-center">
//               <label htmlFor="categoryName" className="text-lg">
//                 Category Name:{" "}
//               </label>
//               <input
//                 type="text"
//                 id="categoryName"
//                 className="ring ring-gray-500 rounded-lg p-2"
//               />
//             </div>

//             <div className="flex gap-3 justify-between items-center">
//               <label htmlFor="categorySubject" className="text-lg">
//                 Subject:{" "}
//               </label>
//               <input
//                 type="text"
//                 id="categorySubject"
//                 className="ring ring-gray-500 rounded-lg p-2"
//               />
//             </div>

//             <div className="flex gap-3 justify-between items-center">
//               <label htmlFor="categoryFile" className="text-lg">
//                 Category Name:{" "}
//               </label>
//               <input
//                 type="file"
//                 id="categoryFile"
//                 className="ring w-47 h-20 ring-gray-500 rounded-lg p-2"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditModalAdmin;
