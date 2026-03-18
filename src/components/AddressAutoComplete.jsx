import React, { useState, useEffect, useRef } from "react";
import "./AddressAutocomplete.css";

const AddressAutocomplete = ({
  setLocation,
  placeholder = "Area / Locality",
  className = "",
}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const placesService = useRef(null);

  const autocompleteService = useRef(null);
  const wrapperRef = useRef(null);

  // Initialize the AutocompleteService when Google Maps API is available
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    } else {
      console.warn("Google Maps API not loaded yet.");
    }
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const mapDiv = document.createElement("div");
      placesService.current = new window.google.maps.places.PlacesService(
        mapDiv,
      );
    }
  }, []);

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
  }, [wrapperRef]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // If API isn't loaded or input is empty, clear suggestions
    if (!autocompleteService.current) {
      // Try to re-initialize in case it loaded late
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
      } else {
        return;
      }
    }

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Fetch predictions
    autocompleteService.current.getPlacePredictions(
      { input: value },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      },
    );
  };

  const handleSelectSuggestion = (suggestion) => {
    setInput(suggestion.description);
    setShowSuggestions(false);

    if (!placesService.current) return;

    placesService.current.getDetails(
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
    console.log(location);
  };

  return (
    <div
      className={`address-autocomplete-wrapper  ${className}`}
      ref={wrapperRef}
    >
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="border-1 rounded-md h-9 w-full p-2 border-black focus:border-3 focus:border-gray-700"
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true);
        }}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="suggestion-item"
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
