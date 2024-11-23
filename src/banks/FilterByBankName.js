import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Filter.css'
import API_BASE_URL from "../config.js";

function BankSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [banks, setBanks] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      searchBankByName(searchQuery);
    }
  }, [searchQuery]);

  const searchBankByName = async (query) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${window.env?.REACT_APP_API_BASE_URL}/bank/findBankByName?name=${query}`);
      const { message, listOfBanksDTO } = response.data;

      if (listOfBanksDTO.length === 0) {
        setMessage('No banks found with the specified name.');
      } else {
        setMessage(message);
        setBanks(listOfBanksDTO);
      }
    } catch (error) {
      console.error('Error searching for banks by name:', error);
      setMessage('No banks found with the specified name.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h2>Search the bank by name!!!</h2><br/>
      <Form>
        <Form.Group as={Row}>
          <Col xs={6}>
            <Form.Control
              type="text"
              placeholder="Search the bank by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Button variant="primary" onClick={() => searchBankByName(searchQuery)}>Search</Button>
          </Col>
        </Form.Group>
      </Form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <br/>
          {message && <h4>{message}</h4>}
          <br/>
          {banks.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Bank Name</th>
                  <th>Email</th>
                  <th>Bank Address</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {banks.map((bank) => (
                  <tr key={bank.bankId}>
                    <td>{bank.bankName}</td>
                    <td>{bank.email}</td>
                    <td>{bank.bankAddress}</td>
                    <td>{bank.contactNumber}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          
        </div>
      )}
    </Container>
  );
}

export default BankSearch;
