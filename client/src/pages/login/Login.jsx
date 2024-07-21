import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="p-4 shadow-sm" style={{ backgroundColor: "#ffffff", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <h1 className="text-center mb-4" style={{ color: "#343a40", fontWeight: "bold", fontSize: "2.5rem" }}>
                ONE MORE BLOG
              </h1>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label style={{ color: "#495057" }}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                    style={{ borderColor: "#ced4da" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label style={{ color: "#495057" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    style={{ borderColor: "#ced4da" }}
                  />
                </Form.Group>
                {err && <div className="text-danger mb-3">{err}</div>}
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3" style={{ color: "#495057" }}>
                <span>Don't have an account?</span>{" "}
                <Link to="/register" className="text-decoration-none">
                  Register here
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
