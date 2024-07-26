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
                <div className="text-left font-Hublot text-gray-300 text-lg leading-20 pt-4 pb-4">
                  RepoFinder is a platform where beginners, intermediate, and advanced developers can find repositories based on their interests, knowledge, and tech stack to contribute to open source projects.
                  <p className="text-left font-Hublot text-gray-300 text-lg leading-20 pt-2">
                    As open source contributors, we often face challenges like not finding the exact repositories we want or having trouble finding repositories that match our personal knowledge or tech stack. This project aims to solve those problems by helping developers discover GitHub repositories tailored to their interests, knowledge, and tech stack.
                  </p>
                </div>
                <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <BsGear className="inline align-bottom " /> How It Works
                </h1>
                <div className="text-left font-Hublot text-gray-300 text-lg leading-20 pt-4 pb-4">
                  <h2 className="text-white font-bold text-xl pb-2">1. Enter GitHub Username</h2>
                  Begin by entering your GitHub username. The platform analyzes your contribution history and suggests repositories that match your tech stack and interests.
                  <h2 className="text-white font-bold text-xl pb-2 pt-4">2. Fetch and Display</h2>
                  Using relevant APIs, the top repositories across GitHub are compiled and displayed based on the user's input and contribution history.
                  <h2 className="text-white font-bold text-xl pb-2 pt-4">3. Repository Insights</h2>
                  Each repository includes details such as the owner's username, repository name, star count, fork count, repository URL, live link, and description. Additionally, the primary language and topics of the repository are highlighted.
                </div>
                <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <GoGraph className="inline align-bottom" /> Benefits for Developers
                </h1>
                <div className="text-left font-Hublot text-gray-300 text-lg leading-20 pt-4 pb-4">
                  <h2 className="text-white font-bold text-xl pb-1">• Encouragement of Open Source Culture:</h2>
                  By making it easier to find and contribute to projects, the platform lowers the barriers to entry for new open source contributors. It promotes transparency, collaboration, and community-driven development.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Improved Collaboration:</h2>
                  The platform acts as a bridge between project maintainers and potential contributors, fostering collaboration and collective problem-solving.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Project Improvement:</h2>
                  By attracting more contributors, open source projects benefit from diverse perspectives and skill sets, leading to higher quality and more innovative solutions. More contributors can help implement new features more rapidly and efficiently.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Learning Opportunities:</h2>
                  Developers can learn from the codebases of others, improving their own coding practices and knowledge. The platform provides access to a wide range of resources, facilitating continuous learning and development.
                </div>
                {/* Uncomment and update this section if you want to highlight unique aspects of your platform */}
                {/* <h1 className="pt-10 pb-2 text-left font-Mona font-bold text-white text-4xl leading-20  ">
                  <GoGitPullRequestClosed className="inline align-bottom" /> What Makes RepoFinder Different?
                </h1>
                <div className="text-left font-Hublot text-gray-300 text-lg leading-20 pt-4 pb-4">
                  <h2 className="text-white font-bold text-xl pb-1">• Scope & Focus</h2>
                  Unlike other platforms, RepoFinder emphasizes local software development communities, offering a unique lens into regional talent and trends.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Objective Metrics</h2>
                  RepoFinder uses a combination of followers, public repositories, and commits to objectively rank developers.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Developer Profiles</h2>
                  RepoFinder provides a holistic view of a developer, including their social media presence, offering a more rounded perspective on their professional persona.
                  <h2 className="text-white font-bold text-xl pt-4 pb-1">• Ease of Use</h2>
                  RepoFinder simplifies the process of finding leading developers in a specific region, accommodating both technical and non-technical users.
                </div> */}
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
