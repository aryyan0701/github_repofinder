import "../App.css";
import GlobeComponent from "../components/GlobeComponent";
import { Link } from "react-router-dom";
import TypingAnimation from "../components/TypingAnimation";
import {FaRegStar, FaUser } from "react-icons/fa";
import { IoGitPullRequestSharp, IoSparklesSharp, IoLink } from "react-icons/io5";


function Home() {
  return (
    <>
      <main className="bg-thegray home-no-scroll ">
        <div className="min-h-screen flex items-center justify-center relative ">
          {/*Background behind other elemetns */}
          <div className="absolute top-[24rem]  w-[45rem] h-[45rem] bg-blue-300 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
          <div className="absolute top-[24rem]  w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>

          <div className="relative">
            {/* Globe behind other elements*/}
            <div className="absolute flex justify-center globe-position pt-10 fade-in3">
              <GlobeComponent />
            </div>
            <div className="relative z-10 pt-0 pb-20">
              {/* Other elements */}

              {/*Main content / Hero section */}
              <div className="HomeContainer ">
                <h1 className="hidden md:block text-center pb-1 lg:pl-6 pointer-events-none select-none customFont text-6xl text-gray-100 leading-[1.1] max-w-[55rem] fade-in1">
                  Find the  <span>Repo</span> <span>as per your interest</span> in <TypingAnimation />
                </h1>

                <h1 className="md:hidden text-center pb-4 lg:pl-6 pointer-events-none select-none px-4 customFont text-5xl text-gray-100 leading-[1.1] max-w-[53rem ]">
                  Find the Repo as per your<span className="custom-text-shadow"> interest</span>.
                </h1>

                {/* Display on larger screens */}
                <div className=" pb-4 select-none text-center font-Hublot text-gray-300 text-2xl max-w-[42rem] leading-20 pt-4 fade-in2">
                  Start by entering the tech stack you know very well. Resulted repos are based on the tech stack you entered. Repos contains{" "}
                  <span className="text-white">
                    <FaUser className="inline align-text-bottom" /> Owner Info
                  </span>
                  ,{" "}
                  <span className="text-white">
                   <FaRegStar className="inline align-text-bottom" /> stars
                  </span>
                  ,{" "}
                  <span className="text-white">
                  <IoGitPullRequestSharp className="inline align-text-bottom"/> pull request
                  </span>
                  ,{" "}
                  <span className="text-white">
                  <IoLink className="inline align-text-bottom"/> url and more...
                  </span>
                </div>

                <Link to="/search" className="get-started-button font-mono select-none fade-in3">
                <IoSparklesSharp className="inline align-text-top" />  Get Started
                </Link>
              </div>
            </div>
          </div>

          <a href="https://my-portfolio-upgraded-pr2utpg2t-developerrahulofficial.vercel.app" target="_blank" rel="noopener noreferrer" className=" font-Hublot leading-12 tracking-wider pb-2 jack-sheehy">
            <span className="text-gray-300 font-bold">Developed by Aryan :) </span> <br />
            <span className="text-gray-400"> ©2024 </span>
          </a>
        </div>
      </main>
    </>
  );
}
export default Home;