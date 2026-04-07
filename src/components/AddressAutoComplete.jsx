import React, { useState, useEffect, useRef } from "react";
import "./AddressAutocomplete.css";
import { MapPin } from "lucide-react";

const AddressAutocomplete = ({
  value = "",
  onChange,
  setLocation,
  placeholder = "Area / Locality",
  className = "",
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const wrapperRef = useRef(null);

  // Sync internal state with prop if controlled
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setInternalValue(inputValue);
    if (onChange) onChange(inputValue);

    if (!inputValue.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (!window.google || !window.google.maps) {
      console.warn("Google Maps API not loaded yet.");
      return;
    }

    let searchSuccessful = false;

    // Try executing with the new Places API first (which removes deprecation warnings)
    try {
      if (window.google.maps.importLibrary) {
        const { AutocompleteSuggestion } =
          await window.google.maps.importLibrary("places");
        if (
          AutocompleteSuggestion &&
          AutocompleteSuggestion.fetchAutocompleteSuggestions
        ) {
          const request = { input: inputValue };
          const res =
            await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
          if (res && res.suggestions) {
            setSuggestions(
              res.suggestions.map((s) => ({
                description: s.placePrediction.text.text,
                place_id: s.placePrediction.placeId,
              })),
            );
            setShowSuggestions(true);
            searchSuccessful = true;
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
            searchSuccessful = true; // Technically succeeded but no results
          }
        }
      }
    } catch (error) {
      console.warn(
        "Places API (New) is likely not enabled in Google Cloud Console. Falling back to legacy Places API.",
        error,
      );
    }

    // Fallback to legacy AutocompleteService if the new API threw a 403 or import wasn't found
    if (
      !searchSuccessful &&
      window.google.maps.places &&
      window.google.maps.places.AutocompleteService
    ) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: inputValue },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            // Normalizing predictions
            const normalized = predictions.map((p) => ({
              description: p.description,
              place_id: p.place_id,
            }));
            setSuggestions(normalized);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        },
      );
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    setInternalValue(suggestion.description);
    if (onChange) onChange(suggestion.description);
    setShowSuggestions(false);

    if (!window.google || !window.google.maps) return;

    let fetchSuccessful = false;

    // Try executing with the new Places API Google.maps.Place
    try {
      if (window.google.maps.importLibrary) {
        const { Place } = await window.google.maps.importLibrary("places");
        if (Place) {
          const place = new Place({ id: suggestion.place_id });
          await place.fetchFields({ fields: ["location"] });

          if (place.location) {
            const lat =
              typeof place.location.lat === "function"
                ? place.location.lat()
                : place.location.lat;
            const lng =
              typeof place.location.lng === "function"
                ? place.location.lng()
                : place.location.lng;

            if (setLocation) {
              setLocation({
                address: suggestion.description,
                place_id: suggestion.place_id,
                lat,
                lng,
              });
            }
            fetchSuccessful = true;
          }
        }
      }
    } catch (error) {
      console.warn(
        "New Places API Place details failed. Falling back to legacy API.",
        error,
      );
    }

    // Fallback to legacy PlacesService
    if (
      !fetchSuccessful &&
      window.google.maps.places &&
      window.google.maps.places.PlacesService
    ) {
      const mapDiv = document.createElement("div");
      const placesService = new window.google.maps.places.PlacesService(mapDiv);
      placesService.getDetails(
        { placeId: suggestion.place_id },
        (place, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place.geometry
          ) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            if (setLocation) {
              setLocation({
                address: suggestion.description,
                place_id: suggestion.place_id,
                lat,
                lng,
              });
            }
          }
        },
      );
    }
  };

  return (
    <div
      className={`address-autocomplete-wrapper relative  ${className}`}
      ref={wrapperRef}
    >
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#870D32] transition-colors">
          <MapPin size={18} />
        </div>
        <input
          type="text"
          value={internalValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-[#870D32]/10 focus:border-[#870D32]/20 outline-none transition-all"
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-[100] top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="px-4 py-3 cursor-pointer hover:bg-pink-50/50 flex items-start gap-3 group transition-colors border-b border-gray-50 last:border-none"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center text-gray-400 group-hover:text-[#870D32] border border-transparent group-hover:border-pink-100 transition-all shrink-0">
                <MapPin size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {suggestion.description.split(",")[0]}
                </p>
                <p className="text-[10px] text-gray-400 font-medium truncate mt-0.5">
                  {suggestion.description.split(",").slice(1).join(",").trim()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
