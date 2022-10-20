import { useContext } from "react";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthConext } from "../../../Context/AuthProvider";
import LeftSideNav from "../LeftSideNav/LeftSideNav";
import RightSideNav from "../RightSideNav/RightSideNav";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logOut } = useContext(AuthConext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
    navigate("/");
  };
  return (
    <Navbar bg="light" className="mb-3" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">Pocket News</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">All News</Nav.Link>
            <Nav.Link href="#link">Pricing</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link>
              {user?.uid ? (
                <>
                  <span>{user?.displayName}</span>
                  <Button variant="light" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </Nav.Link>
            <Nav.Link>
              {user?.photoURL ? (
                <Image
                  style={{ height: "30px" }}
                  roundedCircle
                  src={user.photoURL}
                ></Image>
              ) : (
                <FaUser></FaUser>
              )}
            </Nav.Link>
          </Navbar.Collapse>
          <div className="d-lg-none">
            <LeftSideNav></LeftSideNav>
            <RightSideNav></RightSideNav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
