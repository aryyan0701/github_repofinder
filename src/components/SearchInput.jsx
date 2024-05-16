import React from 'react';
import debounce from 'lodash/debounce';

const SearchInput = ({ value, onInputChange, onSearch, isSearching }) => {
  const debouncedInputChange = debounce(onInputChange, 20); 

  const handleChange = (event) => {
    const query = event.target.value;
    debouncedInputChange(query);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="w-[15rem] h-[2rem] rounded-l px-2"
        value={value}
        onChange={handleChange}
        placeholder="Enter your tech stack"
      />
      <button
        onClick={onSearch}
        className="h-[2rem] px-4 bg-blue-500 text-white rounded-r flex items-center justify-center"
        disabled={isSearching} // Disable button while searching
      >
        {isSearching ? (
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : (
          "Find"
        )}
      </button>
    </div>
  );
};

export default SearchInput;
