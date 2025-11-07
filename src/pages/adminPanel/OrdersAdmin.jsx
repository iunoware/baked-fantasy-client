import { useState } from "react";

function OrdersAdmin() {
  const [active, setActive] = useState();

  return (
    <div className="bg mb-10">
      <div className="lg:pl-30 pl-20 pt-10 pr-10">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
          <div>
            <h1 className="text-3xl new-primary-text font-semibold lora">
              Orders Management
            </h1>
            <p className="text-md pt-1">Manage and track all bakery orders</p>
          </div>
          <div></div>
        </div>
        <div className="bg-white h-fit mt-10 shadow-2xl rounded-2xl">
          {/* heading */}
          <div className="p-6">
            <div>
              <h2 className="text-2xl lora new-primary-text font-bold">
                {" "}
                All Orders
              </h2>
              <p className="text-lg">Track and manage customer orders</p>
            </div>
          </div>
          {/* selectors */}
          <div className="md:p-10 p-4">
            <div className="flex justify-around h-15 items-center rounded-2xl font-bold bg-pink-100">
              <div
                className={`${
                  active === "courses" ? "new-primary-bg text-white" : ""
                } flex items-center justify-center text-sm md:text-[14px] rounded-xl ml-2 h-12  w-1/3 cursor-pointer`}
                onClick={() => setActive("courses")}
              >
                Courses
              </div>
              <div
                className={`${
                  active === "bakery" ? "new-primary-bg text-white" : ""
                } flex items-center text-sm md:text-[14px] justify-center rounded-xl ml-2 h-12  w-1/3 cursor-pointer`}
                onClick={() => setActive("bakery")}
              >
                Bakery
              </div>
              <div
                className={`${
                  active === "essentials" ? "new-primary-bg text-white" : ""
                } flex items-center text-sm md:text-[14px] p-2 md:p-0 justify-center h-12 rounded-xl mr-2 w-1/3 cursor-pointer`}
                onClick={() => setActive("essentials")}
              >
                Baking Essentials
              </div>
            </div>
            {/* table */}
            <div className="overflow-x-auto pt-10">
              <table className="min-w-full divide-y-2 divide-gray-200">
                <thead className="ltr:text-left rtl:text-right">
                  <tr className="*:font-medium *:text-gray-900">
                    <th className="px-3 py-2 whitespace-nowrap">Date</th>
                    <th className="px-3 py-2 whitespace-nowrap">Order Id</th>
                    <th className="px-3 py-2 whitespace-nowrap">Course Name</th>
                    <th className="px-3 py-2 whitespace-nowrap">
                      Customer Name
                    </th>
                    <th className="px-3 py-2 whitespace-nowrap">Price</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                  <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">05/10/20225</td>
                    <td className="px-3 py-2 whitespace-nowrap">1241</td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      30 Days Baking Course
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">Sumathi R</td>
                    <td className="px-3 py-2 whitespace-nowrap">₹ 499</td>
                  </tr>
                  <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">04/06/2025</td>
                    <td className="px-3 py-2 whitespace-nowrap">1214</td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      15 Days Baking Course
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      Rajesh Prasanth
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">₹ 399</td>
                  </tr>
                  <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">12/10/2025</td>
                    <td className="px-3 py-2 whitespace-nowrap">1212</td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      30 Days Baking Course
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">Thrisha S</td>
                    <td className="px-3 py-2 whitespace-nowrap">₹ 399</td>
                  </tr>
                  <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">20/06/2025</td>
                    <td className="px-3 py-2 whitespace-nowrap">1234</td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      15 Days Baking Course
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">Mandana R</td>
                    <td className="px-3 py-2 whitespace-nowrap">₹ 399</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersAdmin;
