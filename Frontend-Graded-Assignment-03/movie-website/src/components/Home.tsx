// Importing the useState hook from React
import { useState } from "react";
import MoviesList from "./movie-list/MoviesList";
import TabOptions from "../utils/TabOptions";
import Menu from "./global/Menu";

// Array containing available tab options
const tabOptions = [
  TabOptions.HOME,
  TabOptions.MOVIES_IN_THEATERS,
  TabOptions.COMING_SOON,
  TabOptions.TOP_RATED_INDIAN,
  TabOptions.TOP_RATED_MOVIES,
  TabOptions.FAVOURITES,
];

// Functional component for the Home page
function Home() {
  // State hook to manage the currently active tab
  const [tab, setTab] = useState<TabOptions>(TabOptions.HOME);

  return (
    <div>
      {/* Displaying tab buttons based on the available options */}
      <div className="menu-tabs">
        {tabOptions.map((tabopts) => (
          <button
            key={tabopts}
            className={`tab-options ${
              tabopts === tab ? "tab-option-active" : ""
            }`}
            onClick={() => setTab(tabopts)}
          >
            {tabopts}
          </button>
        ))}
      </div>
      {/* Displaying content based on the selected tab */}
      <div className="content-container">
        {tab === TabOptions.HOME && <Menu />}
        {tab === TabOptions.MOVIES_IN_THEATERS && (
          <MoviesList tabName="movies-in-theaters" />
        )}
        {tab === TabOptions.COMING_SOON && (
          <MoviesList tabName="movies-coming" />
        )}
        {tab === TabOptions.TOP_RATED_INDIAN && (
          <MoviesList tabName="top-rated-india" />
        )}
        {tab === TabOptions.TOP_RATED_MOVIES && (
          <MoviesList tabName="top-rated-movies" />
        )}
        {tab === TabOptions.FAVOURITES && <MoviesList tabName="favourite" />}
      </div>
    </div>
  );
}

// Exporting the Home component for use in other parts of the application
export default Home;
