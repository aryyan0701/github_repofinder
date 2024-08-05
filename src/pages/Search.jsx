import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import Cobe from "../components/AutoGlobe";
import SearchInput from "../components/SearchInput";
import { SEARCH_USER_DETAILS, SEARCH_REPOSITORIES } from "../utils/graphql";
import apolloClient from "../utils/apolloClient";

function Search() {
  const [coordinates, setCoordinates] = useState([45, 20]);
  const [searchInput, setSearchInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMoreRepos, setHasMoreRepos] = useState(true);
  const [afterCursor, setAfterCursor] = useState(null);

  useEffect(() => {
    const savedUserData = sessionStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const [searchUserDetails, { loading: userLoading, error: userError }] =
    useLazyQuery(SEARCH_USER_DETAILS, {
      client: apolloClient,
      onCompleted: (data) => {
        setUserData(data.user);
        sessionStorage.setItem("userData", JSON.stringify(data.user));
        fetchRepositories(data.user, null);
        setIsSearching(false);
      },
    });

  const [searchRepositories, { loading: repoLoading, error: repoError }] =
    useLazyQuery(SEARCH_REPOSITORIES, {
      client: apolloClient,
      onCompleted: (data) => {
        console.log("Fetched Repositories:", data);
        if (data.search.edges.length > 0) {
          setRepoData((prevRepos) => [...prevRepos, ...data.search.edges]);
          const lastEdge = data.search.edges[data.search.edges.length - 1];
          setAfterCursor(lastEdge.cursor);
        } else {
          setHasMoreRepos(false);
        }
        setIsSearching(false);
      },
    });

  const handleInputChange = (query) => {
    setSearchInput(query);
    if (query.trim() === "") {
      setRepoData([]);
      setUserData(null);
      sessionStorage.removeItem("userData");
      setHasMoreRepos(false);
      setAfterCursor(null);
      setIsSearching(false)
    }
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      setIsSearching(true);
      setRepoData([]);
      setHasMoreRepos(true);
      setAfterCursor(null);
      searchUserDetails({ variables: { username: searchInput } });
    } else {
      setUserData(null);
      setRepoData([]);
      sessionStorage.removeItem("userData");
      setHasMoreRepos(false);
      setAfterCursor(null);
    }
  };

  const fetchRepositories = (user, after) => {
    const totalContributions =
      user.contributionsCollection.contributionCalendar.totalContributions;
    const primaryLanguage = getTopLanguages(user)[0];
  
    let query = `language:${primaryLanguage} sort:updated-desc `;
    let starRange = "";
  
    if (totalContributions > 1500) {
      starRange = "stars:>1000";
    } else if (totalContributions > 1000) {
      starRange = "stars:500..1000";
    } else if (totalContributions > 500) {
      starRange = "stars:100..500";
    } else if (totalContributions > 0) {
      starRange = "stars:<100";
    } else {
      starRange = "stars:<50";
    }
  
    query += `${starRange}`;
  
    console.log(
      "Fetching Repositories with Query:",
      query,
      "After Cursor:",
      after
    );
  
    setIsSearching(true); 
    searchRepositories({ variables: { query, first: 12, after } });
  };
  

  const getTopLanguages = (data) => {
    const languageCounts = {};

    const addLanguage = (language) => {
      if (language) {
        languageCounts[language] = (languageCounts[language] || 0) + 1;
      }
    };

    data.contributionsCollection.commitContributionsByRepository.forEach(
      (repo) => addLanguage(repo.repository.primaryLanguage?.name)
    );

    data.topRepositories.nodes.forEach((repo) =>
      addLanguage(repo.primaryLanguage?.name)
    );

    const sortedLanguages = Object.entries(languageCounts).sort(
      (a, b) => b[1] - a[1]
    );

    return sortedLanguages.slice(0, 3).map(([name]) => name);
  };

  const handleLoadMore = () => {
    if (userData && afterCursor) {
      fetchRepositories(userData, afterCursor);
    }
  };

  return (
    <main className="bg-thegray relative min-h-screen">
      <div className="hidden lg:block">
        <Cobe coordinates={coordinates} />
      </div>
      <div className="flex flex-col items-start justify-center relative pb-0 px-4 md:px-8 lg:px-32">
        <div className="pt-6 pb-6">
          <h1 className="font-Mona select-none font-bold text-white text-5xl leading-20 pb-2 fade-in1">
            Search perfect Repo
          </h1>
          <div className="pt-6 pb-6">
            <SearchInput
              value={searchInput}
              onInputChange={handleInputChange}
              onSearch={handleSearch}
              isSearching={isSearching}
            />
            {(userLoading || repoLoading || isSearching) && (
              <p className="text-gray-300">Loading...</p>
            )}
            {userError && (
              <p className="text-red-500">Error: {userError.message}</p>
            )}
            {repoError && (
              <p className="text-red-500">Error: {repoError.message}</p>
            )}
            {repoData.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {repoData.map(({ node: repo }) => (
                  <div
                    key={repo.url}
                    className="bg-gray-800 p-4 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={repo.owner.avatarUrl}
                        alt={repo.owner.login}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-white">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {repo.name}
                          </a>
                        </h2>
                        <p className="text-sm text-gray-400">
                          by {repo.owner.login}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-300">{repo.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-gray-400">
                        {repo.stargazers.totalCount} stars
                      </span>
                      <span className="text-gray-400">
                        {repo.forks.totalCount} forks
                      </span>
                    </div>
                    {repo.primaryLanguage && (
                      <p className="mt-2 text-sm text-gray-500">
                        Primary Language: {repo.primaryLanguage.name}
                      </p>
                    )}
                       {repo.issues.totalCount > 0 && (
                      <div className="mt-4">
                        <a
                          href={`${repo.url}/issues`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm bg-gray-200 px-2 py-1 rounded hover:underline"
                        > Visit Issues ({repo.issues.totalCount})
                        </a>
                      </div>
                    )}
                    {repo.repositoryTopics.nodes.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm text-gray-400">Topics:</h3>
                        <ul className="flex flex-wrap gap-2">
                          {repo.repositoryTopics.nodes.map((topic) => (
                            <li
                              key={topic.topic.name}
                              className="text-xs bg-gray-700 px-2 py-1 rounded"
                            >
                              {topic.topic.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {hasMoreRepos && repoData.length > 0 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleLoadMore}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isSearching} // Disable button while loading more
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
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Search;
