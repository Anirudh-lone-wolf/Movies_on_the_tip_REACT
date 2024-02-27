// Importing necessary components, styles, and FontAwesome icons
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import IMovie from "../../models/IMovie";

// Defining the Props type for the MovieListItem component
type Props = {
  movie: IMovie;
  tabName: string;
  onDelete: any;
  onAddClick: any;
};

// Functional component MovieListItem with destructured Props
const MovieListItem = ({ movie, tabName, onDelete, onAddClick }: Props) => {
  // Destructuring movie object to get relevant details
  const { id, title, posterurl, year } = movie;

  // Encoding movie title for URL
  const encodedTitle = encodeURIComponent(title);

  // Using React Hooks to manage local state
  const [data] = useState({
    currentTab: tabName,
    releasedYear: year,
    id: id,
  });

  // Async function to add the movie to favorites
  //This line uses destructuring assignment to create a new object named 'favMovie' by copying all properties from the 'movie' object except the id property. The 'id' property is assigned to a variable named 'id'
  const addMovieToFav = async () => {
    const { id, ...favMovie } = movie;
    onAddClick(favMovie);
  };

  // Async function to delete the movie from favorites
  const deleteMovieFromFav = async () => {
    onDelete(id as string);
    console.log("After on Delete");
  };

  return (
    <div>
      {/* Card component from React Bootstrap for displaying movie details */}
      <Card className="movie-card">
        {/* Link to navigate to the movie details page with state data */}
        <Link to={`/${encodedTitle}`} state={{ data: data }}>
          {/* Container for the movie poster */}
          <div className="poster-container">
            {/* <Card.Img
              variant="top"
              src={`${process.env.REACT_APP_BASE_URL}/images/${poster}`}
              alt={title}
              className="card-img"
            /> */}
            <Card.Img
              variant="top"
              src={`${posterurl}`}
              alt={title}
              className="card-img"
            />
          </div>
        </Link>
        {/* Card body containing movie title and buttons for adding/removing from favorites */}
        <Card.Body>
          <Card.Title className="card-title">
            {title.length > 23 ? title.substring(0, 23).concat("...") : title}
          </Card.Title>
          {/* Container for add to favorite and remove from favorite buttons */}
          <div className="add-to-fav">
            {/* Render delete button if the tab is 'favourite' */}
            {tabName === "favourite" && (
              <Button
                className="btn-del"
                variant="outline-primary"
                onClick={deleteMovieFromFav}
              >
                <FontAwesomeIcon icon={faTrash} /> Remove from Favourite
              </Button>
            )}
            {/* // Render add to favorite button if the tab is not 'favourite' */}
            {tabName !== "favourite" && (
              <Button
                className="btn-fav"
                variant="outline-primary"
                onClick={addMovieToFav}
              >
                <FontAwesomeIcon icon={faHeart} style={{ color: "#FF0000" }} />{" "}
                Add to Favourite
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

// Exporting the MovieListItem component as the default export
export default MovieListItem;
