import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./AllBanks.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

const AllBanks = ({ bank, onLogout }) => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    loadBanks();
  }, []);

  const loadBanks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/bank/fetchAllBanks"
      );
      setBanks(response.data.listOfBanksDTO);
    } catch (error) {
      console.error("Error loading banks:", error);
    }
  };

  return (
    <div className="px-5 py-3 allbanks">
      <div className="d-flex justify-content-center all-banks-container">
        <Container>
          <Row>
            <Col className="text-center">
              <h2 className="bank-details-header">List of Bank details...</h2>
              <p>"Discover the roster of operational banks"</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Reg Id</th>
                    {/* <th>Bank Id</th> */}
                    <th>Bank Name</th>
                    <th>Bank Address</th>
                    <th>Email</th>
                    {/* <th>Contact Number</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {banks.map((bank, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {/* <td>{bank.bankId}</td> */}
                      <td>{bank.bankName}</td>
                      <td>{bank.bankAddress}</td>
                      <td>{bank.email}</td>
                      {/* <td>{bank.contactNumber}</td> */}
                      <td>
                  <Link className='btn btn-primary mx-2' to={`/dashboard/viewbank/${bank.bankId}`}>View</Link>
                  <Link className='btn btn-outline-dark mx-2' to={`/dashboard/updatebank/${bank.bankId}`}>Update</Link>
                </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AllBanks;
