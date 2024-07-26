// src/components/SearchInput.js
import React, { useState } from "react";
import debounce from "lodash/debounce";
import Modal from "react-modal";
import { HiQuestionMarkCircle } from "react-icons/hi";

Modal.setAppElement("#root");

const SearchInput = ({ value, onInputChange, onSearch, isSearching }) => {
  const debouncedInputChange = debounce(onInputChange, 20);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = (event) => {
    const query = event.target.value;
    debouncedInputChange(query);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="w-[15rem] h-[2.5rem] rounded-l px-2"
        value={value}
        onChange={handleChange}
        placeholder="Enter GitHub username"
      />
      <button
        onClick={onSearch}
        className="h-[2.5rem] px-4 bg-blue-500 text-white rounded-r flex items-center justify-center"
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
          "Search"
        )}
      </button>
      <HiQuestionMarkCircle
        onClick={openModal}
        className="inline text-white ml-3 text-4xl cursor-pointer align-text-center"
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Criteria Modal"
        className="modal bg-gray-800 rounded-lg shadow-lg p-6"
        overlayClassName="overlay"
      >
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute top-0 right-1 text-3xl text-white"
          >
            &times;
          </button>
          <div className="text-white">
            <h2 className="text-xl font-bold mb-4">Search Criteria</h2>
            <p>
              <strong>Enter your GitHub username</strong> to find details about your profile.
            </p>
            <p className="mt-4">
              We will show you the perfect GitHub repositories for your next contribution based on your past contribution history.
            </p>
            <p className="mt-4">
              After entering your username, we analyze your past contribution graph on GitHub and recommend repositories that match your preferred tech stack, languages, or frameworks.
            </p>
            <p className="mt-4">
              Our algorithm analyse your profile's total contributions, primary languages, and stars on your repositories to provide you with the most relevant suggestions.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchInput;
