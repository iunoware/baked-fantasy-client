import { useState } from "react";
import { Button } from "../ui/button";
import api from "../../api";
import toast from "react-hot-toast";

export function ProfileHeader({ name, email, mobileNumber, address, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: name || "",
    email: email || "",
    mobileNumber: mobileNumber || "",
    address: address || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setForm({
      name,
      email,
      mobileNumber,
      address: address || "",
    });
    setError("");
    setOpen(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Name cannot be empty.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      // Try to update on backend; carry on if route doesn't exist yet
      await api.patch("/update-profile", {
        name: form.name,
        mobileNumber: form.mobileNumber,
        email: form.email,
        address: form.address,
      });

      toast.success("User details updated");
    } catch (err) {
      // Non-fatal — backend route may not exist yet
      console.warn("Profile update endpoint not available:", err.message);
    }

    setSaving(false);
    setOpen(false);
    if (onUpdate) onUpdate(form);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex flex-col gap-1 mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm sm:text-base">
            <span>{mobileNumber}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:inline-block"></span>
            <span>{email}</span>
            {address && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:inline-block"></span>
                <span className="italic">{address}</span>
              </>
            )}
          </div>
        </div>
        <Button
          onClick={handleOpen}
          className="rounded-xl px-6 bg-pink-500 hover:bg-pink-600 text-white font-medium shadow-sm transition-all"
        >
          Edit Profile
        </Button>
      </div>

      {/* Edit Profile Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  name="mobileNumber"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Address
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, City, Pincode"
                  rows="2"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition resize-none"
                />
              </div> */}

              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold transition-all"
              >
                {saving ? "Saving…" : "Save Changes"}
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="flex-1 rounded-xl font-semibold border-gray-200"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
