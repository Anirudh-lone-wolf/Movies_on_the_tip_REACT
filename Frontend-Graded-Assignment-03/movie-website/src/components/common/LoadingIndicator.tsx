// Importing Spinner component from the react-bootstrap library
import { Spinner } from "react-bootstrap";

// Defining the expected properties for the LoadingIndicator component
type Props = {
  size: "small" | "medium" | "large";
  message: string;
};

// Mapping of size values to their corresponding width and height styles
const sizeMap = {
  small: {
    width: "1.5rem",
    height: "1.5rem",
  },
  medium: {
    width: "2rem",
    height: "2rem",
  },
  large: {
    width: "4rem",
    height: "4rem",
  },
};

// LoadingIndicator component definition
const LoadingIndicator = ({ size, message }: Props) => {
  return (
    // Container div with flex and alignment properties
    <div className="d-flex flex-column align-items-center my-4">
      {/* Spinner component with animation and role properties */}
      <Spinner animation="grow" role="status" style={sizeMap[size]}>
        {/* Visually hidden span containing the loading message for accessibility */}
        <span className="visually-hidden">{message}</span>
      </Spinner>
      {/* Span to display the loading message */}
      <span className="my-2">{message}</span>
    </div>
  );
};

// Setting default properties for the LoadingIndicator component
LoadingIndicator.defaultProps = {
  size: "medium",
  message: "Loading...",
};

export default LoadingIndicator;
