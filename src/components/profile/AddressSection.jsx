import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, MapPin, CheckCircle2, X } from "lucide-react";
import api from "../../api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AddressAutocomplete from "../AddressAutoComplete";

export function AddressSection() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    label: "Home",
    fullAddress: "",
    landmark: "",
    building: "",
    lat: null,
    lng: null,
  });

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/address");
      setAddresses(res.data);
    } catch (error) {
      console.error("Error fetching addresses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const setActiveAddress = async (id) => {
    try {
      const res = await api.put(`/address/${id}/select`);
      setAddresses(res.data);
    } catch (error) {
      console.error("Error setting active address", error);
    }
  };

  const deleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await api.delete(`/address/${id}`);
      setAddresses(res.data);
    } catch (error) {
      console.error("Error deleting address", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Edit existing
        const res = await api.put(`/address/${editingId}`, formData);
        setAddresses(res.data);
      } else {
        // Add new
        const res = await api.post("/address", formData);
        // post returns single address, fetch all again to get sorted list
        await fetchAddresses(); 
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ label: "Home", fullAddress: "", landmark: "", building: "", lat: null, lng: null });
    } catch (error) {
      console.error("Error saving address", error);
    }
  };

  const handleEdit = (addr) => {
    setFormData({
      label: addr.label || "Home",
      fullAddress: addr.fullAddress || addr.address || "",
      landmark: addr.landmark || "",
      building: addr.building || "",
      lat: addr.lat || null,
      lng: addr.lng || null,
    });
    setEditingId(addr._id);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Manage Addresses</h2>
        {!showForm && (
          <Button 
            onClick={() => {
              setFormData({ label: "Home", fullAddress: "", landmark: "", building: "", lat: null, lng: null });
              setEditingId(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 font-medium px-4 py-2 rounded-lg transition-colors border-none shadow-none"
          >
            <Plus className="w-4 h-4" /> Add New
          </Button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50/50 relative">
          <button 
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-bold mb-4">{editingId ? "Edit Address" : "Add New Address"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Label (e.g., Home, Work)</label>
                <Input 
                  value={formData.label}
                  onChange={(e) => setFormData({...formData, label: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Building / Flat No</label>
                <Input 
                  value={formData.building}
                  onChange={(e) => setFormData({...formData, building: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1 relative">
              <label className="text-sm font-semibold text-gray-600">Full Address</label>
              <AddressAutocomplete 
                value={formData.fullAddress}
                onChange={(val) => setFormData({...formData, fullAddress: val})}
                setLocation={(loc) => {
                  setFormData((prev) => ({
                    ...prev,
                    fullAddress: loc.address,
                    lat: loc.lat,
                    lng: loc.lng
                  }));
                }}
                placeholder="Search for your area or building..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Landmark (Optional)</label>
              <Input 
                value={formData.landmark}
                onChange={(e) => setFormData({...formData, landmark: e.target.value})}
              />
            </div>
            <div className="pt-2 flex gap-3">
              <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
                Save Address
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="rounded-lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {!showForm && addresses.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
          <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p>You haven't added any addresses yet.</p>
        </div>
      ) : !showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`relative border rounded-xl p-5 transition-all duration-300 ${
                  addr.isDefault
                    ? "border-pink-500 bg-pink-50/30 shadow-md ring-1 ring-pink-500 ring-opacity-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="flex gap-3 mb-3">
                <MapPin className={`w-5 h-5 flex-shrink-0 mt-0.5 ${addr.isDefault ? "text-pink-500" : "text-gray-400"}`} />
                <div>
                  <h3 className="font-semibold text-gray-900 capitalize flex items-center gap-2">
                    {addr.label || "Address"}
                    {addr.isDefault && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    )}
                  </h3>
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    {addr.building && <p>{addr.building}</p>}
                    <p className="line-clamp-2">{addr.fullAddress || addr.address}</p>
                    {addr.landmark && <p className="text-gray-500">Landmark: {addr.landmark}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                {!addr.isDefault ? (
                  <button
                    onClick={() => setActiveAddress(addr._id)}
                    className="text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors"
                  >
                    Select as Active
                  </button>
                ) : (
                  <span className="text-sm font-medium text-gray-400 italic">Currently Selected</span>
                )}

                <div className="flex items-center gap-4 text-gray-400">
                  <button 
                    onClick={() => handleEdit(addr)} 
                    className="hover:text-pink-500 transition-colors p-1" 
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteAddress(addr._id)} 
                    className="hover:text-red-500 transition-colors p-1" 
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
