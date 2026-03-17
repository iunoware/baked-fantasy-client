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

    if (setLocation) {
      setLocation({
        address: suggestion.description,
        place_id: suggestion.place_id,
      });
    }
  };

  return (
    <div
      className={`address-autocomplete-wrapper border-gray-900! ${className}`}
      ref={wrapperRef}
    >
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="address-autocomplete-input"
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
