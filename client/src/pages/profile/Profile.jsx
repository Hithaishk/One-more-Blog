import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";
import { makeRequest } from "../../axios";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest.get(`/users/find/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="profile">
      {user ? (
        <Container className="py-4">
          <Card className="shadow-sm rounded-3">
            <div className="image-cover position-relative">
              <Card.Img
                src={`/upload/${user.coverPic}`}
                alt=""
                className="cover img-fluid"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />

              <div
                className="profile-photo position-absolute bottom-0 start-50 translate-middle-x"
                style={{ transform: "translateY(75%)" }}
              >
                <div
                  className="profile-circle bg-white rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                  style={{
                    width: "160px",
                    height: "160px",
                    padding: "5px",
                    border: "2px solid white",
                  }}
                >
                  <Card.Img
                    src={`/upload/${user.profilePic}`}
                    alt=""
                    className="profilePic rounded-circle img-fluid"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>

            <Card.Body>
              <Row className="align-items-center mb-4">
                <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                  <div className="left">
                    <a href="http://facebook.com">
                      <FacebookTwoToneIcon fontSize="large" />
                    </a>
                    <a href="http://instagram.com">
                      <InstagramIcon fontSize="large" />
                    </a>
                    <a href="http://twitter.com">
                      <TwitterIcon fontSize="large" />
                    </a>
                    <a href="http://linkedin.com">
                      <LinkedInIcon fontSize="large" />
                    </a>
                    <a href="http://pinterest.com">
                      <PinterestIcon fontSize="large" />
                    </a>
                  </div>
                </Col>
                <Col xs={12} md={4} className="text-center">
                  <div className="center">
                    <h1 className="mb-2">{user.name}</h1>
                    <div className="info d-flex flex-column align-items-center">
                      <div className="item d-flex align-items-center mb-1">
                        <PlaceIcon className="me-1" />
                        <span>{user.city}</span>
                      </div>
                      <div className="item d-flex align-items-center">
                        <LanguageIcon className="me-1" />
                        <span>{user.website}</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={4} className="text-center">
                  <div className="right">
                    <EmailOutlinedIcon className="me-2" />
                    <MoreVertIcon />
                  </div>
                </Col>
              </Row>
              {userId === currentUser.id && (
                <div className="text-center">
                  <Button variant="primary" onClick={() => setOpenUpdate(true)}>
                    Update Profile
                  </Button>
                </div>
              )}
              <Posts userId={userId} />
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <div className="text-center py-5">Loading...</div>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={user} />}
    </div>
  );
};

export default Profile;
