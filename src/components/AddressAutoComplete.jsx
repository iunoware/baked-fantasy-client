import React, { useState, useEffect, useRef } from "react";
import "./AddressAutocomplete.css";

const AddressAutocomplete = ({
  value = "",
  onChange,
  setLocation,
  placeholder = "Area / Locality",
  className = "",
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

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
        const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places");
        if (AutocompleteSuggestion && AutocompleteSuggestion.fetchAutocompleteSuggestions) {
          const request = { input: inputValue };
          const res = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
          if (res && res.suggestions) {
            setSuggestions(
              res.suggestions.map((s) => ({
                description: s.placePrediction.text.text,
                place_id: s.placePrediction.placeId,
              }))
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
        error
      );
    }

    // Fallback to legacy AutocompleteService if the new API threw a 403 or import wasn't found
    if (!searchSuccessful && window.google.maps.places && window.google.maps.places.AutocompleteService) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: inputValue }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
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
      });
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
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
            const lat = typeof place.location.lat === "function" ? place.location.lat() : place.location.lat;
            const lng = typeof place.location.lng === "function" ? place.location.lng() : place.location.lng;

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
      console.warn("New Places API Place details failed. Falling back to legacy API.", error);
    }

    // Fallback to legacy PlacesService
    if (!fetchSuccessful && window.google.maps.places && window.google.maps.places.PlacesService) {
      const mapDiv = document.createElement("div");
      const placesService = new window.google.maps.places.PlacesService(mapDiv);
      placesService.getDetails({ placeId: suggestion.place_id }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry) {
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
      });
    }
  };

  return (
    <div
      className={`address-autocomplete-wrapper  ${className}`}
      ref={wrapperRef}
    >
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="border-1 border rounded-md h-[42px] w-full px-3 py-2 border-slate-200 focus:border-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true);
        }}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="suggestion-item bg-white" // added bg-white just in case
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
