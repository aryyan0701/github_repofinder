// src/components/SuggestionList.jsx
import React from 'react';

const SuggestionList = ({ suggestions, onSuggestionClick }) => {
  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion);
  };

  return (
    <>
      {suggestions.length > 0 ? (
        <div className="bg-white shadow-md rounded-md mt-2 w-[15rem]">
          <ul className="divide-y divide-gray-200">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default SuggestionList;