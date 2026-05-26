/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Trash2, Plus, X, Tag } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function PromoCode() {
  const [promos, setPromos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ code: "", discount: "" });
  const token = sessionStorage.getItem("adminToken");

  useEffect(() => {
    fetchPromos();
  }, []);

  useEffect(() => {
    document.querySelector("body").style.overflow = isModalVisible
      ? "hidden"
      : "auto";
  }, [isModalVisible]);

  async function fetchPromos() {
    try {
      const res = await axios.get(`${API_URL}/promocode`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPromos(res.data);
    } catch (error) {
      console.error("Error fetching promos:", error.response?.data);
      toast.error("Failed to fetch promo codes");
    }
  }

  function validate() {
    const code = form.code.toUpperCase().trim();
    const discount = Number(form.discount);

    if (!code) {
      toast.error("Promo code is required");
      return false;
    }
    if (code.length < 6 || code.length > 8) {
      toast.error("Code must be 6–8 characters");
      return false;
    }
    if (!/^[A-Z0-9]+$/.test(code)) {
      toast.error("Letters and numbers only");
      return false;
    }
    if (!form.discount) {
      toast.error("Discount is required");
      return false;
    }
    if (discount < 1 || discount > 100) {
      toast.error("Discount must be between 1–100");
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/promocode`,
        {
          code: form.code.toUpperCase().trim(),
          discount: Number(form.discount),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Promo code created!");
      setForm({ code: "", discount: "" });
      setIsModalVisible(false);
      setTimeout(() => fetchPromos(), 500);
    } catch (error) {
      console.error("Error creating promo:", error.message);
      toast.error(
        error.response?.data?.message || "Failed to create promo code",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this promo code?")) return;
    try {
      await axios.delete(`${API_URL}/promocode/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Promo code deleted");
      setPromos((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting promo:", error.message);
      toast.error("Failed to delete promo code");
    }
  }

  function handleCodeChange(e) {
    const val = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8);
    setForm((prev) => ({ ...prev, code: val }));
  }

  function closeModal() {
    setIsModalVisible(false);
    setForm({ code: "", discount: "" });
    toast.error("No changes saved");
  }

  return (
    <div className="bg h-[100vh]">
      {/* Modal */}
      <div
        className={`${isModalVisible ? "block" : "hidden"} fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
        role="dialog"
        aria-modal="true"
      >
        <div className="rounded-lg bg-white p-6 shadow-lg w-full max-w-md">
          <div className="flex justify-between pb-3">
            <h2 className="text-2xl font-bold">New Promo Code</h2>
            <button
              onClick={closeModal}
              className="cursor-pointer hover:rotate-90 transition-all ease-in"
            >
              <X />
            </button>
          </div>

          <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            {/* Code */}
            <p className="text-sm text-gray-700">
              Promo Code (6–8 chars, A–Z / 0–9):
            </p>
            <input
              type="text"
              value={form.code}
              onChange={handleCodeChange}
              placeholder="e.g. SAVE20"
              className="ring ring-gray-500 text-black rounded-lg p-2 w-full tracking-widest text-lg uppercase"
            />
            <p className="text-xs text-gray-400 text-right -mt-1">
              {form.code.length}/8
            </p>

            {/* Discount */}
            <p className="text-sm text-gray-700">Discount (%):</p>
            <div className="relative">
              <input
                type="number"
                value={form.discount}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, discount: e.target.value }))
                }
                placeholder="e.g. 10"
                min={1}
                max={100}
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                %
              </span>
            </div>

            <div className="flex justify-center items-center my-4">
              <button
                type="submit"
                disabled={loading}
                className="new-primary-bg font-semibold hover:cursor-pointer hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl disabled:opacity-60"
              >
                {loading ? "Creating..." : "Confirm Promo Code"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Page */}
      <div className="lg:pl-30 pl-20 pt-10 pr-5">
        {/* Header */}
        <div className="flex flex-row gap-5 md:gap-0 justify-between">
          <div>
            <h1 className="text-3xl new-primary-text font-semibold lora">
              Promo Codes
            </h1>
            <p className="text-md pt-1">
              {promos.length} code{promos.length !== 1 ? "s" : ""} active
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsModalVisible(true)}
              className="new-primary-bg flex gap-2 items-center text-white font-semibold px-2 py-2 md:py-3 md:px-5 rounded-xl hover:scale-102 transition-all duration-200"
            >
              <Plus size={15} /> Add Code
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex items-center justify-center mt-10">
          {promos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60 text-gray-400 gap-3">
              <Tag size={40} strokeWidth={1.2} />
              <p className="text-lg">No promo codes yet</p>
            </div>
          ) : (
            <div className="bg-white relative p-5 rounded-2xl shadow-2xl w-full max-w-4xl h-fit">
              <div className="mb-5">
                <h2 className="font-bold text-xl">Promo Code Information</h2>
                <p className="pt-2">Active Promo Codes</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr className="bg-gray-50 border-b text-gray-500 uppercase text-xs tracking-wide">
                      <th className="text-left px-4 sm:px-6 py-4">Code</th>
                      <th className="text-left px-4 sm:px-6 py-4">Discount</th>
                      <th className="text-left px-4 sm:px-6 py-4 hidden sm:table-cell">
                        Created
                      </th>
                      <th className="text-right px-4 sm:px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promos.map((promo, i) => (
                      <tr
                        key={promo._id}
                        className={`border-b last:border-0 hover:bg-gray-50 transition-colors ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <span className="font-bold tracking-widest text-sm sm:text-base new-primary-text bg-primary/10 px-2 sm:px-3 py-1 rounded-lg">
                            {promo.code}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="font-semibold text-green-600">
                            {promo.discount}% off
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-gray-400 hidden sm:table-cell">
                          {new Date(promo.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <button
                            onClick={() => handleDelete(promo._id)}
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
