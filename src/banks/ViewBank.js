import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import './ViewBank.css'
import API_BASE_URL from "../config.js";

export default function ViewBank() {
  const [bank, setBank] = useState({
    bankName: "",
    bankAddress: "",
    email: "",
    contactNumber: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadBank(id);
  }, [id]);

  const loadBank = async (id) => {
    const result = await axios.get(
      `http://bank-api:9090/bank/fetchById/${id}`
    );
    if (result.data.listOfBanksDTO.length > 0) {
      setBank(result.data.listOfBanksDTO[0]);
    } else {
      console.log("Bank not found!");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h2 className="text-center">Explore Bank Details!!</h2>
              <p>"Retrieve bank details based on the provided ID."</p>
            </Card.Header>
            <Card.Body
              style={{
                background: "#f8f9fa", // Background color
                borderRadius: "20px", // Rounded corners
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Shadow
                padding: "20px", // Padding
              }}
            >
              <Card.Title>Bank id: {id}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="list-group-item-text list-group-item-border">
                  <strong>Bank name:</strong> {bank.bankName}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-text list-group-item-border">
                  <strong>Bank address:</strong> {bank.bankAddress}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-text list-group-item-border">
                  <strong>E-mail:</strong> {bank.email}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-text list-group-item-border">
                  <strong>Contact Number:</strong> {bank.contactNumber}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Link className="btn btn-primary my-2" to="/dashboard/userhome">
            Back to Home
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
