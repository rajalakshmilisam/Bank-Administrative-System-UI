import React from "react";
import { Card, Container, Row, Col, Alert, Image } from "react-bootstrap";
import { FaUserShield } from "react-icons/fa";

import adminImage from "../src/user2.jpg";

function AdminPage() {
  const cardStyle = {
    backgroundColor: "#e1f5fe"
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card style={cardStyle}>
            <Card.Header>
              <h2 className="text-center">
                {" "}
                Welcome Admin!!! <FaUserShield />
              </h2>
            </Card.Header>
            <Card.Body>
              <Alert>
                <Alert.Heading>Hey, nice to see you back!!!</Alert.Heading>
                <Image
                  src={adminImage}
                  alt="userimage"
                  style={{
                    width: "20%",
                    border: "2px solid smokewhite",
                    borderRadius: "10px",
                  }}
                />
                <p>
                  "Welcome, esteemed Administrator, to the heart of our
                  financial institution. Your role is pivotal in maintaining the
                  security, integrity, and prosperity of our bank. As the
                  guardian of our financial operations, you possess the
                  knowledge and expertise needed to steer our institution toward
                  success."
                </p>
                <hr />
                <p style={{ marginBottom: 0 }}>
                  "Your dedication ensures that our customers' trust is
                  well-placed, and your decisions shape the future of our
                  financial endeavors. We are grateful for your leadership and
                  confident that under your guidance, our bank will continue to
                  thrive and serve our clients with excellence."
                </p>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
