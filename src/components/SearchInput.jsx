import React from 'react';
import debounce from 'lodash/debounce';

const SearchInput = ({ value, onInputChange, onSearch }) => {
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
        className="h-[2rem] px-4 bg-blue-500 text-white rounded-r"
      >
        Find
      </button>
    </div>
  );
};

export default SearchInput;
