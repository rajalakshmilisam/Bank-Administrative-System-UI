import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../src/pages/logo.png';

function AppHeader() {
  return (
    <div className="AppHeader text-white py-4">
      <Container>
        <Row className="align-items-center">
          <Col xs={1} className="text-left">
            <img src={logo} alt="Logo" width={55} className="rounded-circle img-fluid" />
          </Col>
          <Col xs={10} className="text-center">
            <h2 className="mb-0">Bank Management System</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AppHeader;
