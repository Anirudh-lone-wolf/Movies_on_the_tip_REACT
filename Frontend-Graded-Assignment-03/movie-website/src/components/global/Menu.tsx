import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { menuData } from "../../services/Movie";
import PageNotFound from "./PageNotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import OptionCard from "./OptionCard";

const baseUrl = "/";

// Define and export the Menu component
const Menu = () => {
  const imgArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [menu, setMenu] = useState<string[]>([]);

  useEffect(() => {
    const helper = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchMenu = await menuData();
        setMenu(fetchMenu);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    helper();
  }, []);

  return (
    <>
      {loading && (
        <>
          <LoadingIndicator
            message="Loading..."
            size="large"
          ></LoadingIndicator>
        </>
      )}
      {!loading && error && (
        <>
          <PageNotFound></PageNotFound>
        </>
      )}
      {/* Application title with a film icon */}
      <h1>
        <FontAwesomeIcon icon={faFilm} className="me-2" />
        Movie<span style={{ color: "#02a8c7" }}>OnTip</span>
      </h1>
      {/* Introduction paragraph with a welcome message */}
      <p
        className="ms-3 font text-center"
        style={{ fontWeight: "bolder", fontSize: "32px" }}
      >
        <br />
        Welcome to the{" "}
        <a href="/" style={{ textDecoration: "none" }}>
          Movie<span style={{ color: "#02a8c7" }}>OnTip</span>
        </a>{" "}
        App.
      </p>
      <hr />
      {/* List of actions that users can perform */}
      {menu.length !== 0 && !loading && !error && (
        <>
          <div>
            <Container fluid style={{ paddingTop: "0%", paddingBottom: "0%" }}>
              <Row className="my-3">
                <p>
                  Movies on the Tip is an online movie manager whose
                  responsibility is to take care of all the activities a user
                  can do on this portal.{" "}
                </p>
                <p>Here you can explore the below activities...</p>
                <hr />
              </Row>
              <Row xs={2} md={5}>
                {menu.map((item, idx) => (
                  <Col className="my-3">
                    <OptionCard
                      ImgUrl={`${imgArray[idx]}`}
                      RedirectUrl={`${baseUrl}`}
                      OptionName={item.replace(/-/g, " ")}
                    ></OptionCard>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </>
      )}
      <br />
      <p>
        And enjoy the Experience on{" "}
        <a href="/" style={{ textDecoration: "none" }}>
          Movie<span style={{ color: "#02a8c7" }}>Plix</span>
        </a>{" "}
        .
      </p>
    </>
  );
};

export default Menu;
