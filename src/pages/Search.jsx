import React, { useState } from "react";
import Cobe from "../components/AutoGlobe";
import { useLazyQuery } from "@apollo/client";
import SearchInput from "../components/SearchInput";
import SuggestionList from "../components/SuggesionList";
import suggestions from "../components/Suggestions";
import { SEARCH_REPOSITORIES } from "../utils/graphql";
import apolloClient from "../utils/apolloClient";
import { FaUser, FaRegStar, FaExternalLinkAlt } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { FaCodeFork } from "react-icons/fa6";

function Search() {
  const [coordinates, setCoordinates] = useState([45, 10]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [queryData, setQueryData] = useState(null); // New state to handle query data

  const [searchRepositories, { loading, error }] = useLazyQuery(SEARCH_REPOSITORIES, {
    client: apolloClient,
    onCompleted: data => setQueryData(data), // Set query data when query completes
  });

  const handleInputChange = (query) => {
    setSearchInput(query);

    if (query.trim() === "") {
      setFilteredSuggestions([]);
      setQueryData(null);
    } else {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      searchRepositories({ variables: { query: searchInput, first: 10 } });
    } else {
      setQueryData(null); // Ensure query data is cleared when search input is empty
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setFilteredSuggestions([]);
    searchRepositories({ variables: { query: suggestion, first: 10 } });
  };

  return (
    <>
      <main className="bg-thegray relative min-h-screen">
        <div className="fixed w-full max-w-lg right-64">
          <div className="absolute top-16 -right-12 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>
          <div className="absolute top-64 right-20 w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
        </div>

        <div className="hidden lg:block">
          <Cobe coordinates={coordinates} />
        </div>
        <div className="flex flex-col items-start justify-center relative pb-0 px-4 md:px-8 lg:px-32">
          <div className="pt-6 pb-6">
            <h1 className="font-Mona select-none font-bold text-white text-5xl leading-20 pb-2 fade-in1">
              Search
            </h1>
            <div className="flex select-none">
              <p className="font-Hublot select-none text-gray-300 mr-4 max-w-[28rem] leading-[1.7rem] fade-in2">
                Start by entering the location you want to rank developers from.
                Keep in mind, the results reflect the location users have
                entered themselves and are not entirely definitive.
              </p>
            </div>
            <div className="pt-6 pb-6">
              <h1 className="text-4xl text-semibold lg:mb-5 text-gray-300">
                Search Repositories
              </h1>
              <SearchInput
                value={searchInput}
                onInputChange={handleInputChange}
                onSearch={handleSearch}
              />
              <SuggestionList
                suggestions={filteredSuggestions}
                onSuggestionClick={handleSuggestionClick}
              />
              {loading && <p className="text-gray-300">Loading...</p>}
              {error && <p className="text-red-500">Error: {error.message}</p>}
              {queryData && queryData.search.edges.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {queryData.search.edges.map((edge, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-white">{edge.node.name}</h3>
                      <p className="text-gray-400"><FaUser  className="inline align-text-center mr-1 mb-2"/> {edge.node.owner.login}</p>
                      <p className="text-gray-400">
                        <IoLink className="inline align-text-center mr-1 mb-2"/> <a href={edge.node.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{edge.node.url}</a>
                      </p>
                      <p className="text-gray-400">
                        <FaExternalLinkAlt className="inline align-text-center mr-1 mb-2"/> <a href={edge.node.homepageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{edge.node.homepageUrl}</a>
                      </p>
                      <p className="text-gray-400"><FaRegStar className="inline align-text-center mr-1 mb-2"/> {edge.node.stargazers.totalCount}</p>
                      <p className="text-gray-400"><FaCodeFork className="inline align-text-center mr-1 mb-2"/> {edge.node.forks.totalCount}</p>
                      <p className="text-gray-400">Des: {edge.node.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {queryData && queryData.search.edges.length === 0 && (
                <p className="text-gray-400 mt-4">No repositories found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Search;
