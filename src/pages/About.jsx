import "../App.css";
import { GoQuestion, GoGraph, GoGitPullRequestClosed } from "react-icons/go";
import { BsGear } from "react-icons/bs";

function About() {
  return (
    <>
      <main className="bg-thegray home-no-scroll fade-in1">
        <div className="min-h-screen flex items-center justify-center relative pb-32">
          <div className="relative">
            <div className="relative z-10 pt-5 pb-20">
              <div className="pt-10 max-w-[42rem] px-5">
                <h1 className="text-left font-Mona font-bold text-white text-4xl leading-20 pb-2  ">
                  <GoQuestion className="inline align-bottom text-4xl" /> About RepoFinder
                </h1>
                <div className="  text-left font-Hublot text-gray-300 text-lg leading-20 pt-4 pb-4 ">
                RepoFinder is platform where beginners, intermediate, advanced all type of dev's can find the repos as per there interest, knowledge and their personal tech stack to contribute in open source.
                  <p className="text-left font-Hublot text-gray-300 text-lg leading-20 pt-2">   
                As a open source contributors we are facing many problems in our way like not found the exect repo we want, facing trouble to finding repo in our personal knowledge or tech stack to contribute in it. so i started to build this project where devlopers can find the github repos as per their personal interest, knowledge, and tech stack.
                  </p>
                </div>
                <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <BsGear className="inline align-bottom " /> How It Works
                </h1>
                <div className="  text-left font-Hublot text-gray-300 text-lg  leading-20 pt-4 pb-4 ">
                  <h2 className="text-white font-bold text-xl pb-2">1 Choose your tech stack</h2>
                  Start by entering your known/interested tech stack into the search box. Keep in mind that the results reflect the tech stack github Repo has.
                  <h2 className="text-white font-bold text-xl pb-2 pt-4">2 Fetch and Display</h2>
                  Using the relavent API's, the top Repo's are compiled across GitHub, GitLab and BitBucket. As per the users req api's fetch the data and rendered the github Repo's.
                  <h2 className="text-white font-bold text-xl pb-2 pt-4">3 Repo's Insights</h2>
                  Each Repo has their owner's username, Repo name, starred count, fork count, Repo url, live link, description.
                </div>
                <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <GoGraph className="inline align-bottom" /> Benefits for Developers
                </h1>
                <div className="  text-left font-Hublot text-gray-300 text-lg  leading-20 pt-4 pb-4 ">
                <h2 className="text-white font-bold text-xl pb-1">• Encouragement of Open Source Culture:</h2>
                  By making it easier to find and contribute to projects, the platform lowers the barriers to entry for new open source contributors. The platform promotes the open source culture, encouraging transparency, collaboration, and community-driven development.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Improved Collaboration:</h2>
                  The platform act as bridge between project maintainers and potential contributors to established their connections.
                  Developers can build a community around their projects, fostering collaboration and collective problem-solving.{" "}
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Project Improvement:</h2>
                  By attracting more contributors, open source projects can benefit from diverse perspectives and skill sets, leading to higher quality and more innovative solutions. With more contributors, projects can implement new features more rapidly and efficiently.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Learning Opportunities:</h2>
                  Access to Resources: Developers can learn from the codebases of others, improving their own coding practices and knowledge.{" "}
                </div>{" "}
                {/* <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <GoGitPullRequestClosed className="inline align-bottom" /> What Makes locationGit Different?
                </h1> */}
                {/* <div className="  text-left font-Hublot text-gray-300 text-lg  leading-20 pt-4 pb-4 ">
                  <h2 className="text-white font-bold text-xl pb-1">• Scope & Focus</h2>
                  Unlike LinkedIn, GitHub or Crunchbase, which generally focus on the big picture, locationGit can emphasize local software development communities, offering a unique
                  lens into regional talent and trends. <h2 className="text-white font-bold text-xl pt-4 pb-1">• Objective Metrics</h2>
                  locationGit uses a combination of followers, public repositories, and commits to objectively rank developers. This differs from LinkedIn, where visibility often
                  depends on networking skills, or GitHub, where activity isn't always a reflection of influence or skill.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Developer Profiles</h2>
                  While platforms like GitHub focus primarily on code repositories, locationGit provides a more holistic view of a developer, including their social media presence,
                  which offers a more rounded perspective on their professional persona.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Ease of Use</h2>
                  locationGit simplifies the process of finding leading developers in a specific region, a task that can be challenging on more generalized platforms like LinkedIn. The
                  platform also accomadates for technical and non-technical users alike.
                </div>{" "} */}
              </div>
            </div>
          </div>

          <a href="https://github.com/developerrahulofficial" target="_blank" rel="noopener noreferrer" className="text-white font-Hublot leading-5 tracking-wider pb-2 jack-sheehy">
            Developer Aryan :) <br />
            ©2024
          </a>
        </div>
      </main>
    </>
  );
}
export default About;