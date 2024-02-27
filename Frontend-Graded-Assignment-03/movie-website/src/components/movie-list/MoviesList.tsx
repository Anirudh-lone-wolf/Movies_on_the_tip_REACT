// Importing necessary components, libraries, and styles
import { ChangeEvent, Component } from "react";
import {
  Alert,
  Col,
  Form,
  InputGroup,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import LoadingIndicator from "../common/LoadingIndicator";
import IMovie from "../../models/IMovie";
import { LoadingStatus } from "../../models/types";
import MovieListItem from "./MovieListItem";
import {
  addMovieToFavourite,
  deleteMovieFromFavourite,
  getMovieDetailsByTitleAndYear,
  getMovies,
  getMoviesFromSearching,
} from "../../services/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

// Defining Props type for the MoviesList component
type Props = {
  tabName: string;
};

// Defining State type for the MoviesList component
type State = {
  status: LoadingStatus;
  movies?: IMovie[];
  error?: Error | null;
  tabName: string;
  searchedText: string;
  show: boolean;
  response: string;
  responseText: string;
};

// Class component MoviesList, extending the React Component class
class MoviesList extends Component<Props, State> {
  // Constructor method initializing the component state
  constructor(props: Props) {
    super(props);

    this.state = {
      status: "LOADING",
      movies: [],
      error: null,
      tabName: this.props.tabName,
      searchedText: "",
      show: false,
      response: "",
      responseText: "",
    };
    // Binding methods to the current instance of the class
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchDataAfterDelete = this.fetchDataAfterDelete.bind(this);
    this.addSelectedMovieToFavourite =
      this.addSelectedMovieToFavourite.bind(this);
  }

  // Event handler for input change in the search box
  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchedText: event.target.value });
  }

  // Async function to fetch movies based on the searched text
  async fetchSearchedData(text: string) {
    try {
      const tabName = this.state.tabName;
      let search = text;
      let moviesList = await getMoviesFromSearching(tabName, search);

      // Updating the component state with the fetched movies
      this.setState({
        status: "LOADED",
        movies: moviesList,
      });
    } catch (err) {
      // Handling errors by updating the component state
      this.setState({
        status: "ERROR_LOADING",
        error: err as Error,
      });
    }
  }

  // Async function to fetch movies based on the current tab
  async fetchData() {
    this.setState({
      status: "LOADING",
    });

    try {
      const tabName = this.state.tabName;
      const moviesList = await getMovies(tabName);

      // Updating the component state with the fetched movies
      this.setState({
        status: "LOADED",
        movies: moviesList,
      });
    } catch (err) {
      this.setState({
        status: "ERROR_LOADING",
        error: err as Error,
      });
    }
  }

  // Async function to fetch movies after deleting a movie from favorites
  async fetchDataAfterDelete(id: string) {
    console.log("Fetched After Delete");
    const deleted = await deleteMovieFromFavourite(id as string);
    // Fetching updated data and updating the component state
    this.fetchData();
    this.setState({
      show: true,
      response: "Success",
      responseText: "Successfully removed from Favourite",
    });
  }

  // Async function to add a selected movie to favorites
  async addSelectedMovieToFavourite(movieToAdd: IMovie) {
    const tempMovie = await getMovieDetailsByTitleAndYear(
      "favourite",
      movieToAdd.title,
      movieToAdd.year
    );

    // Checking if the movie is not already in favorites before adding
    if (tempMovie[0] === undefined) {
      const addedFavM = await addMovieToFavourite(movieToAdd);
      console.log(addedFavM.title);

      // Updating the component state with a success message
      this.setState({
        show: true,
        response: "Success",
        responseText: "Successfully added to Favourite",
      });
    } else {
      // if exists already Updating the component state with an error message
      console.log("Already Exist");
      this.setState({
        show: true,
        response: "Error",
        responseText: "Already added in Favourite",
      });
    }
  }

  // Render method for rendering the component UI
  render() {
    let el;

    const { status, movies, error, tabName } = this.state;

    // Switch statement to handle different states of the component
    switch (status) {
      case "LOADING":
        // Loading state: Displaying a loading indicator
        el = (
          <LoadingIndicator
            size="large"
            message="We are fetching the movies. Please wait..."
          />
        );
        break;
      case "LOADED":
        // Loaded state: Displaying movies and search box
        el = (
          <div>
            <div>
              {tabName !== "favourite" && <h4>Movies</h4>}
              {tabName === "favourite" && <h4>Favourites</h4>}
            </div>
            <Row className="search-box-row">
              <InputGroup className="search-box">
                <Form.Control
                  placeholder="Search Movie"
                  type="text"
                  onChange={this.handleInputChange}
                />
                <InputGroup.Text className="search-icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputGroup.Text>
              </InputGroup>
            </Row>
            {/* // Conditional rendering based on the number of movies */}
            {movies?.length === 0 && (
              <div className="no-data">
                <h3>No Data Found!</h3>
              </div>
            )}
            {movies?.length !== 0 && (
              <Row xs={2} md={3} lg={6}>
                {
                  // Mapping through movies and rendering MovieListItem component
                  movies?.map((movie, idx) => (
                    <Col key={idx} className="d-flex align-items-stretch my-3">
                      <MovieListItem
                        movie={movie}
                        tabName={tabName}
                        onDelete={this.fetchDataAfterDelete}
                        onAddClick={this.addSelectedMovieToFavourite}
                      />
                    </Col>
                  ))
                }
              </Row>
            )}
            {/* ToastContainer for displaying success or error toasts */}
            <ToastContainer position="top-end" className="p-3 position-fixed">
              <Toast
                onClose={() => this.setState({ show: false })}
                show={this.state.show}
                delay={1700}
                autohide
              >
                <Toast.Header>
                  {/* // Displaying success icon if response is 'Success' */}
                  {this.state.response === "Success" && (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size="2x"
                      style={{ color: "#2A9134" }}
                    />
                  )}
                  {/* // Displaying error icon if response is 'Error' */}
                  {this.state.response === "Error" && (
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      size="2x"
                      style={{ color: "#FF0000" }}
                    />
                  )}
                  {/* Toast header text with the response message */}
                  <strong className="me-auto toast-header-text">
                    {this.state.response}
                  </strong>
                </Toast.Header>
                {/* Toast body text with the detailed response message */}
                <Toast.Body className="toast-body-text">
                  {this.state.responseText}
                </Toast.Body>
              </Toast>
            </ToastContainer>
          </div>
        );
        break;
      case "ERROR_LOADING":
        el = <Alert variant="danger">{error?.message}</Alert>;
        break;
    }

    return el;
  }

  // Lifecycle method: componentDidMount is called after the component is mounted
  componentDidMount() {
    // Fetch initial data when the component is mounted/loaded
    this.fetchData();
  }

  // Lifecycle method: componentDidUpdate is called after a component updates
  componentDidUpdate(oldProps: Props, oldState: State) {
    // Check if the searchedText has changed, and if so, fetch new data
    if (oldState.searchedText !== this.state.searchedText) {
      this.fetchSearchedData(this.state.searchedText);
    }
  }
}

// Exporting the MoviesList component as the default export
export default MoviesList;
