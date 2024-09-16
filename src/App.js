import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ordinateur from './Ordinateur';
import Mouvement from './Mouvement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faChartLine } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo-new.jpg';
// import avatar from './assets/avatar.png'; // Importez votre image d'avatar
import Login from './login';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Redirection si l'utilisateur est déconnecté avec useEffect
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const checkAuthentication = () => {
      // Vérifiez si l'utilisateur est dans le localStorage
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login'); // Redirection vers la page de connexion si non connecté
      } else {
        setIsAuthenticated(true); // L'utilisateur est connecté
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <Container fluid className="p-0">
      {
        user ? <Navbar bg="light" expand="lg" className="mb-3 d-flex justify-content-between">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
          </Container>
          <div className="d-flex align-items-center" onClick={() => {
            navigate('/login');
            setIsAuthenticated(false);
            localStorage.removeItem('user');
          }} >
            <div role="button" className="d-flex flex-column align-items-end me-3">
              <span className="fw-bold">{user ? user.userName : 'Invité'}</span>
              <span className="text-muted">{user ? user.email : ''}</span>
            </div>
            <img
              role="button"
              src="https://img.freepik.com/free-vector/bangkok-thailand-may-12-2023-caricature-tiger-woods-smilin_1308-133923.jpg?t=st=1725376370~exp=1725379970~hmac=d9f9ef2501bcbe61daec09054b6b544e6ce0887637a7b2dc6a9c3a86953644fc&w=1060"
              alt="Avatar"
              height="40"
              className="rounded-circle"
            />
          </div>
        </Navbar> : <div></div>

      }



      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/ordinateur" element={<Ordinateur />} />
        <Route path="/mouvement" element={<Mouvement />} />
      </Routes>
    </Container>
  );
};

const Home = () => {
  const menuItems = [
    { icon: faLaptop, title: "Equipements", path: "/ordinateur" },
    { icon: faChartLine, title: "Mouvement des Ordi", path: "/mouvement" },
  ];

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container>
        <Row className="g-4 justify-content-center">
          {menuItems.map((item, idx) => (
            <Col key={idx} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
              <div className="square-card-wrapper">
                <Card className="square-card border-0 shadow-sm" onClick={() => window.location.href = item.path}>
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <FontAwesomeIcon icon={item.icon} size="2x" className="mb-2 text-warning" />
                    <Card.Title className="text-center">{item.title}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;