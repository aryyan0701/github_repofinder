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
  const [queryData, setQueryData] = useState([]); 
  const [pageInfo, setPageInfo] = useState(null); 
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false); 

  const [searchRepositories, { loading, error }] = useLazyQuery(SEARCH_REPOSITORIES, {
    client: apolloClient,
    onCompleted: (data) => {
      setQueryData((prevData) => [...prevData, ...data.search.edges]);
      setPageInfo(data.search.pageInfo);
      setIsLoadingMore(false); 
      setIsSearching(false); 
    },
  });

  const handleInputChange = (query) => {
    setSearchInput(query);

    if (query.trim() === "") {
      setFilteredSuggestions([]);
      setQueryData([]);
    } else {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      setIsSearching(true);
      searchRepositories({ variables: { query: searchInput, first: 10 } });
      setQueryData([]); 
    } else {
      setQueryData([]); 
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setFilteredSuggestions([]);
    setIsSearching(true); 
    searchRepositories({ variables: { query: suggestion, first: 10 } });
    setQueryData([]); 
  };

  const handleLoadMore = () => {
    if (pageInfo?.hasNextPage) {
      setIsLoadingMore(true); 
      searchRepositories({ variables: { query: searchInput, first: 10, after: pageInfo.endCursor } });
    }
  };

  return (
    <>
      <main className="bg-thegray relative min-h-screen">
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
                Start by entering your known/interested tech stack into the search box. Keep in mind that the results reflect the tech stack github Repo has.
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
                isSearching={isSearching} 
              />
              <SuggestionList
                suggestions={filteredSuggestions}
                onSuggestionClick={handleSuggestionClick}
              />
              {loading && <p className="text-gray-300">Loading...</p>}
              {error && <p className="text-red-500">Error: {error.message}</p>}
              {queryData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {queryData.map((edge, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-white">{edge.node.name}</h3>
                      <p className="text-gray-400"><FaUser className="inline align-text-center mr-1 mb-2" /> {edge.node.owner.login}</p>
                      <p className="text-gray-400">
                        <IoLink className="inline align-text-center mr-1 mb-2" /> <a href={edge.node.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{edge.node.url}</a>
                      </p>
                      <p className="text-gray-400">
                        <FaExternalLinkAlt className="inline align-text-center mr-1 mb-2" /> <a href={edge.node.homepageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{edge.node.homepageUrl}</a>
                      </p>
                      <p className="text-gray-400"><FaRegStar className="inline align-text-center mr-1 mb-2" /> {edge.node.stargazers.totalCount}</p>
                      <p className="text-gray-400"><FaCodeFork className="inline align-text-center mr-1 mb-2" /> {edge.node.forks.totalCount}</p>
                      <p className="text-gray-400">Des: {edge.node.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {queryData.length > 0 && pageInfo?.hasNextPage && (
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore} // Disable button while loading
                >
                  {isLoadingMore ? (
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
                    "Load More"
                  )}
                </button>
              )}
              {queryData.length === 0 && searchInput.trim() !== "" && !loading && (
                <p className="text-gray-400 mt-4">No tech stack found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Search;
