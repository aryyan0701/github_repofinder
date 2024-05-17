import React, { useState } from "react";
import debounce from "lodash/debounce";
import { HiQuestionMarkCircle } from "react-icons/hi";
import Modal from "react-modal";
import { FaUser, FaRegStar, FaExternalLinkAlt } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { FaCodeFork } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";

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
        placeholder="Enter your tech stack"
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
          "Find"
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
        className="modal"
        overlayClassName="overlay"
      >
        <div className="bg-gray-700 p-7 rounded-lg shadow-lg">
          <h2 className="text-xl text-white font-bold mb-4">Resulted Repo's Contains</h2>
          <button
            onClick={closeModal}
            className="absolute top-0 right-1 text-3xl text-white"
          >
            &times;
          </button>
          <div className="flex flex-col text-white">
              <strong><FaUser className="inline align-text-center mr-1 mb-2"/>owner</strong>
              <strong><FaRegStar className="inline align-text-center mr-1 mb-2"/>Star Count</strong>
              <strong><FaCodeFork className="inline align-text-center mr-1 mb-2"/>Fork Count</strong>
              <strong><IoLink className="inline align-text-center mr-1 mb-2"/>url</strong>
              <strong><FaExternalLinkAlt className="inline align-text-center mr-1 mb-2"/>live link</strong>
              <strong><MdDescription className="inline align-text-center mr-1 mb-2"/>Description</strong>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchInput;
